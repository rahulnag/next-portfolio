"use client";
import { useEffect, useState } from "react";

// Types and deletes each word in turn. Server-renders the first word in full so it is never empty.
const TypewriterEffect = ({ words, typingSpeed = 70, deletingSpeed = 35, pause = 1800 }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = words[index];
    let timeout;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span aria-live="off">
      <span className="gradient-text">{text}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.08em",
          height: "1em",
          marginLeft: "0.1em",
          verticalAlign: "-0.12em",
          background: "var(--secondary-color)",
          animation: "caret-blink 1s steps(1) infinite",
        }}
      />
      <style>{"@keyframes caret-blink{50%{opacity:0}}"}</style>
    </span>
  );
};

export default TypewriterEffect;
