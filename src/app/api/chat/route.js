import { buildSystemPrompt } from "@/lib/chatContext";

export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 25 };

// Best-effort, per-instance rate limit so the Gemini key can't be drained by one visitor.
const hits = new Map();
const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
};

const jsonError = (message, status) =>
  Response.json({ error: message }, { status });

const toGeminiContents = (messages) =>
  messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content).slice(0, MAX_MESSAGE_LENGTH) }],
  }));

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return jsonError("The chat assistant is not configured yet.", 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return jsonError("You're sending messages too quickly. Please try again in a few minutes.", 429);
  }

  let messages;
  try {
    ({ messages } = await request.json());
  } catch {
    return jsonError("Invalid request.", 400);
  }
  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every((m) => typeof m?.content === "string" && m.content.trim()) &&
    messages[messages.length - 1].role === "user";
  if (!valid) return jsonError("Invalid request.", 400);

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents: toGeminiContents(messages),
        generationConfig: { temperature: 0.4 },
      }),
    }
  );

  if (!upstream.ok || !upstream.body) {
    console.error("Gemini error", upstream.status, await upstream.text().catch(() => ""));
    return jsonError("The assistant is unavailable right now. Please try again later.", 502);
  }

  // Gemini streams Server-Sent Events; forward only the answer text as a plain-text stream.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          try {
            const parts = JSON.parse(line.slice(5)).candidates?.[0]?.content?.parts || [];
            const text = parts.filter((p) => !p.thought && p.text).map((p) => p.text).join("");
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // Ignore keep-alive or partial lines.
          }
        }
      },
    })
  );

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
