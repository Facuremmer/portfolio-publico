'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export default function Typewriter({ phrases, typingSpeed = 60, deletingSpeed = 35, pauseMs = 2000 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }

    const delay = isDeleting ? deletingSpeed : typingSpeed;
    const t = setTimeout(() => {
      setDisplayed(isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span>
      {displayed}
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
