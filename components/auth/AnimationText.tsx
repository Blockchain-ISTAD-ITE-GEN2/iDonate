"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function AnimatedText() {
  const fullText = "សូមស្វាគមន៍មកកាន់ iDonate";
  const [displayText, setDisplayText] = useState("");
  const controls = useAnimationControls();

  useEffect(() => {
    const animateText = async () => {
      while (true) {
        // Forward animation
        for (let i = 1; i <= fullText.length; i++) {
          setDisplayText(fullText.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Backward animation
        for (let i = fullText.length - 1; i >= 0; i--) {
          setDisplayText(fullText.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    animateText();
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 0.5 } });
  }, [displayText, controls]);

  return (
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-iDonate-navy-primary">
      <motion.span initial={{ opacity: 0 }} animate={controls}>
        {displayText.split(" ").map((word, index) => (
          <span key={index} className="inline-block mr-2">
            {word === "iDonate" ? (
              <span className="text-iDonate-green-primary inline-block transform hover:scale-110 transition-transform duration-200">
                {word}
              </span>
            ) : (
              word
            )}
          </span>
        ))}
      </motion.span>
    </h1>
  );
}
