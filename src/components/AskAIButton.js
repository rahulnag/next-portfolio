"use client";

export const OPEN_CHAT_EVENT = "open-portfolio-chat";

// Opens the floating chat assistant, optionally pre-sending a question. Styled by `.btn-ai` in globals.css.
const AskAIButton = ({ question, className = "", children }) => (
  <button
    type="button"
    className={`btn btn-ai ${className}`}
    onClick={() =>
      window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { question } }))
    }
  >
    <span className="ai-sparkle" aria-hidden="true">✦</span>
    {children}
  </button>
);

export default AskAIButton;
