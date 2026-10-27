"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ChatWidget.module.css";
import { OPEN_CHAT_EVENT } from "./AskAIButton";

const MAX_INPUT = 500;

// ---- Minimal, safe Markdown → React (bold, italics, code, links, lists) ----
const INLINE =
  /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\((?:https?:\/\/|mailto:|tel:)[^\s)]+\)|https?:\/\/[^\s)<]+[^\s)<.,]|\*[^*\s][^*]*\*)/g;

const renderInline = (text) =>
  text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link || /^https?:\/\//.test(part)) {
      const href = link ? link[2] : part;
      return (
        <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {link ? link[1] : part.replace(/^https?:\/\/(www\.)?/, "")}
        </a>
      );
    }
    if (/^\*[^*]/.test(part) && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });

const renderMarkdown = (text) => {
  const blocks = [];
  let list = null;
  const flush = () => {
    if (list) blocks.push(list);
    list = null;
  };
  text.split("\n").forEach((raw) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*(?:[-*•]|(\d+)[.)])\s+(.*)$/);
    if (bullet) {
      const ordered = Boolean(bullet[1]);
      if (!list || list.ordered !== ordered) {
        flush();
        list = { ordered, items: [] };
      }
      list.items.push(bullet[2]);
      return;
    }
    flush();
    if (!line.trim()) return;
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    blocks.push(heading ? `**${heading[1].replace(/\*\*/g, "")}**` : line);
  });
  flush();
  return blocks.map((block, i) => {
    if (typeof block === "string") return <p key={i}>{renderInline(block)}</p>;
    const List = block.ordered ? "ol" : "ul";
    return (
      <List key={i}>
        {block.items.map((item, j) => (
          <li key={j}>{renderInline(item)}</li>
        ))}
      </List>
    );
  });
};

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none">
    <path
      d="M12 2.5l1.9 5.2a3 3 0 0 0 1.8 1.8l5.2 1.9-5.2 1.9a3 3 0 0 0-1.8 1.8L12 20.3l-1.9-5.2a3 3 0 0 0-1.8-1.8L3.1 11.4l5.2-1.9a3 3 0 0 0 1.8-1.8L12 2.5z"
      fill="currentColor"
    />
    <circle cx="19" cy="4.5" r="1.5" fill="currentColor" opacity=".7" />
    <circle cx="5" cy="19" r="1.2" fill="currentColor" opacity=".5" />
  </svg>
);

const ChatWidget = ({ config }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const messagesRef = useRef(messages);
  const abortRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  messagesRef.current = messages;

  const updateLast = (patch) =>
    setMessages((prev) => {
      const next = [...prev];
      next[next.length - 1] = { ...next[next.length - 1], ...patch(next[next.length - 1]) };
      return next;
    });

  const send = useCallback(
    async (question) => {
      const text = question.trim().slice(0, MAX_INPUT);
      if (!text || abortRef.current) return;
      const history = [
        ...messagesRef.current.filter((m) => !m.error && m.content),
        { role: "user", content: text },
      ];
      setMessages([...messagesRef.current, { role: "user", content: text }, { role: "assistant", content: "" }]);
      setInput("");
      setBusy(true);
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const { error } = await res.json().catch(() => ({}));
          throw new Error(error || "Something went wrong. Please try again.");
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          updateLast((last) => ({ content: last.content + chunk }));
        }
        updateLast((last) =>
          last.content ? {} : { content: "Sorry, I couldn't generate an answer. Please try rephrasing.", error: true }
        );
      } catch (err) {
        if (err.name === "AbortError") {
          updateLast((last) => (last.content ? {} : { content: "Stopped.", error: true }));
        } else {
          updateLast(() => ({ content: err.message, error: true }));
        }
      } finally {
        abortRef.current = null;
        setBusy(false);
      }
    },
    []
  );

  useEffect(() => {
    const onOpen = (e) => {
      setOpen(true);
      if (e.detail?.question) send(e.detail.question);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [send]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
  };

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content));
  const remaining = config.suggestedQuestions.filter((q) => !asked.has(q));
  const last = messages[messages.length - 1];
  const thinking = busy && last?.role === "assistant" && !last.content;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`${styles.launcher} ${open ? styles.launcherHidden : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        aria-label={open ? "Close AI assistant" : "Chat with Rahul's AI assistant"}
      >
        <span className={styles.launcherIcon}>
          <SparkIcon />
        </span>
        <span className={styles.launcherLabel}>Ask AI about me</span>
      </button>

      <section
        id="portfolio-chat"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-label={config.title}
        aria-hidden={!open}
      >
        <header className={styles.header}>
          <div className={styles.avatar}>
            <Image src="/logo.png" width={40} height={40} alt="" />
            <span className={styles.status} aria-hidden="true" />
          </div>
          <div className={styles.headerText}>
            <p className={styles.title}>{config.title}</p>
            <p className={styles.subtitle}>{config.subtitle}</p>
          </div>
          {messages.length > 0 && (
            <button type="button" className={styles.iconButton} onClick={reset} aria-label="Start a new chat" title="New chat">
              ↺
            </button>
          )}
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => {
              setOpen(false);
              launcherRef.current?.focus();
            }}
            aria-label="Close chat"
          >
            ✕
          </button>
        </header>

        <div className={styles.messages} ref={listRef} aria-live="polite">
          <div className={`${styles.bubble} ${styles.assistant}`}>
            <p>{config.greeting}</p>
          </div>

          {messages.length === 0 && (
            <div className={styles.suggestions}>
              <span className={styles.suggestionsLabel}>Try asking</span>
              {config.suggestedQuestions.map((q) => (
                <button key={q} type="button" className={styles.suggestion} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.bubble} ${m.role === "user" ? styles.user : styles.assistant} ${m.error ? styles.error : ""}`}
            >
              {m.role === "user" ? (
                <p>{m.content}</p>
              ) : thinking && i === messages.length - 1 ? (
                <span className={styles.typing} aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                <>
                  {renderMarkdown(m.content)}
                  {busy && i === messages.length - 1 && <span className={styles.caret} aria-hidden="true" />}
                </>
              )}
            </div>
          ))}
        </div>

        {messages.length > 0 && remaining.length > 0 && !busy && (
          <div className={styles.quickRow}>
            {remaining.slice(0, 3).map((q) => (
              <button key={q} type="button" className={styles.quick} onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="portfolio-chat-input" className="visually-hidden">
            Ask a question about Rahul
          </label>
          <textarea
            id="portfolio-chat-input"
            ref={inputRef}
            className={styles.input}
            value={input}
            maxLength={MAX_INPUT}
            rows={1}
            placeholder="Ask about experience, skills, projects…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
          />
          {busy ? (
            <button type="button" className={styles.send} onClick={() => abortRef.current?.abort()} aria-label="Stop generating">
              ■
            </button>
          ) : (
            <button type="submit" className={styles.send} disabled={!input.trim()} aria-label="Send message">
              ➤
            </button>
          )}
        </form>
        <p className={styles.disclaimer}>AI answers are generated from Rahul&apos;s portfolio and may be imperfect.</p>
      </section>
    </>
  );
};

export default ChatWidget;
