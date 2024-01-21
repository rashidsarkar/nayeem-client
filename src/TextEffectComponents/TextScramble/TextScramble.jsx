import React, { useEffect, useState } from "react";
import "./TextScramble.css";

const TextScramble = ({ text }) => {
  const [originalText, setOriginalText] = useState(text);
  const [scrambledText, setScrambledText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    const scrambleInterval = setInterval(() => {
      if (currentIndex < originalText.length) {
        const prefix = originalText.slice(0, currentIndex);
        const suffix = originalText.slice(currentIndex + 1);
        const randomChar = String.fromCharCode(
          Math.floor(Math.random() * 26) + 97
        ); // Generate a random lowercase letter

        setScrambledText(prefix + randomChar + suffix);

        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(scrambleInterval);
      }
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [originalText]);

  return (
    <span className="text-scramble">
      {isComplete ? originalText : scrambledText}
    </span>
  );
};

export default TextScramble;
