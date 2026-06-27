"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
}

export function TypeWriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDelay = 1500,
}: TypeWriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && displayText === currentWord) {
      // Finished typing — pause before deleting
      const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseDelay);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && displayText === "") {
      // Finished deleting — move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <span className="font-body text-lg md:text-xl text-text-secondary">
      {displayText}
      <span className="text-accent animate-[blink_1s_step-end_infinite]">
        |
      </span>
    </span>
  );
}
