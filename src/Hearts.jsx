import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 16 + Math.random() * 24,
    duration: 8 + Math.random() * 8,
    // delay: Math.random() * 2,
  }));

  return (
    <>
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500"
          style={{ left: `${h.left}%`, top: `${h.top}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -200 - Math.random() * 200],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [0.8, 1.2, 1],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            repeatType: "loop",
            delay: h.delay,
          }}
        >
          <Heart size={h.size} fill="pink" />
        </motion.div>
      ))}
    </>
  );
};

export default FloatingHearts;
