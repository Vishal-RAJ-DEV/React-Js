import React, { useState, useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

const EMOJI_COUNT = 30;
const EMOJIS = [
  "😊", "🚀", "🔥", "✨", "😂", "💫", "😎", "🎉", "🌈", "💥",
  "🎨", "🌟", "💖", "🦄", "🎸", "🌺", "🍕", "🎮", "⭐", "🌙",
  "🍦", "🎪", "🎭", "🎠", "🎡", "🎢", "🎯", "🎲", "🎳", "🎰",
  "🎨", "🌟", "💖", "🦄", "🎸", "🌺", "🍕", "🎮", "⭐", "🌙",
  "🍦", "🎪", "🎭", "🎠", "🎡", "🎢", "🎯", "🎲", "🎳", "🎰",
  "🎨", "🌟", "💖", "🦄", "🎸", "🌺", "🍕", "🎮", "⭐", "🌙",
  "🍦", "🎪", "🎭", "🎠", "🎡", "🎢", "🎯", "🎲", "🎳", "🎰",
  "🎨", "🌟", "💖", "🦄", "🎸", "🌺", "🍕", "🎮", "⭐", "🌙",
  "🍦", "🎪", "🎭", "🎠", "🎡", "🎢", "🎯", "🎲", "🎳", "🎰"
];

const EmojiBackground = () => {
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  const emojiData = useMemo(() => {
    const padding = 60;
    return Array.from({ length: EMOJI_COUNT }).map((_, i) => {
      const emoji = EMOJIS[i % EMOJIS.length];
      const x = Math.random() * (window.innerWidth - padding * 2) + padding;
      const y = Math.random() * (window.innerHeight - padding * 2) + padding;
      const dx = (Math.random() - 0.5) * 50;
      const dy = (Math.random() - 0.5) * 50;
      const scale = 0.8 + Math.random() * 0.5;
      const duration = 6 + Math.random() * 4;
      return { emoji, x, y, dx, dy, scale, duration };
    });
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden z-0" // remove pointer-events: none
      onMouseMove={handleMouseMove}
    >
      {emojiData.map((data, idx) => (
        <ScatteringEmoji key={idx} data={data} mousePos={mousePos} />
      ))}
    </div>
  );
};

const ScatteringEmoji = ({ data, mousePos }) => {
  const controls = useAnimation();
  const [scattered, setScattered] = useState(false);

  // Scattering animation
  useEffect(() => {
    const dist = Math.hypot(mousePos.x - data.x, mousePos.y - data.y);

    if (dist < 80 && !scattered) {
      setScattered(true);

      const scatterX = (Math.random() - 0.5) * 400;
      const scatterY = (Math.random() - 0.5) * 400;

      controls.start({
        x: data.x + scatterX,
        y: data.y + scatterY,
        rotate: [0, 180],
        transition: { duration: 0.4, ease: "easeOut" },
      });

      setTimeout(() => {
        controls.start({
          x: data.x,
          y: data.y,
          transition: { duration: 0.6, ease: "easeInOut" },
        });
        setScattered(false);
      }, 700);
    }
  }, [mousePos, data, controls, scattered]);

  // Floating motion loop when not scattered
  useEffect(() => {
    if (!scattered) {
      controls.start({
        x: [data.x, data.x + data.dx, data.x - data.dx, data.x],
        y: [data.y, data.y + data.dy, data.y - data.dy, data.y],
        transition: {
          duration: data.duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      });
    }
  }, [scattered, controls, data]);

  return (
    <motion.div
      className="absolute text-2xl"
      style={{
        left: 0,
        top: 0,
        userSelect: 'none',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))',
      }}
      initial={{ x: data.x, y: data.y, scale: data.scale }}
      animate={controls}
    >
      {data.emoji}
    </motion.div>
  );
};

export default EmojiBackground;
