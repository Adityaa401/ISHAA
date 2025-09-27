import  { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";


export default function FrontPage() {
  const [flipped, setFlipped] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(-1); // -1 = front card
  const [message, setMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [showText, setShowText] = useState("");
  // const [musicPlaying, setMusicPlaying] = useState(false);
  const [subText, setSubText] = useState("");


  const messages = [
    "You’re stronger than you think 💪 (1/5)",
    "Bad days don’t last, but you do 💖 (2/5)",
    "Protect from evil eyes 🧿 (3/5)",
    "Smile pls, u look the cutest when you do😊 (4/5)",
    "More power to u babygirl💕✨ (5/5)",
  ];

  const photos = [
    '/images/1.jpg',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
  ];

  const photoMessages = [
    "Ashleeeeeeeel babygirl💖",
    "cutuuuuuuuuuu babygirl😊",
    "beautifulllll babygirl🌸",
    "You are amazing, don’t forget 💎",
  ];

  // Floating hearts scattered randomly across the screen
  const hearts = useMemo(
  () =>
    Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 90,
      top: Math.random() * 90,
      size: 16 + Math.random() * 24,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 2, // <- added delay
    })),
  []
);

useEffect(() => {
  const text = "Hey, this little website is just for you 💕";
  let i = 0;
  const interval = setInterval(() => {
    setShowText(text.slice(0, i + 1));
    i++;
    if (i === text.length) {
      clearInterval(interval);

      // Start subText typing after heading finishes
      const subTextContent = "I know kal ka day bohot hectic tha aur painful so i made this to brighten up ur day💖";
      let j = 0;
      const subInterval = setInterval(() => {
        setSubText(subTextContent.slice(0, j + 1));
        j++;
        if (j === subTextContent.length) clearInterval(subInterval);
      }, 60);
    }
  }, 80);
  return () => clearInterval(interval);
}, []);


  const randomMessage = () => {
     setMessage(messages[messageIndex]);

  // Move to the next message, loop back to start after last
  setMessageIndex((prev) => (prev + 1) % messages.length);
  };

  // Flip card click logic
  const handleCardClick = () => {
    if (photoIndex === -1) {
      setPhotoIndex(0);
      setFlipped(true);
    } else if (photoIndex < photos.length - 1) {
      setPhotoIndex((prev) => prev + 1);
    } else {
      setPhotoIndex(-1);
      setFlipped(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center no-scrollbar">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)",
        }}
        animate={{
          background: [
            "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)",
            "linear-gradient(to bottom right, #fad0c4, #ffd1ff)",
            "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />


      {/* Floating ISHUU text */}
      <motion.div
        className="absolute top-2 text-pink-500 playwrite-hu-1 text-2xl sm:text-4xl drop-shadow-md z-20"
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        💖ISHUU💖
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-purple-800 mb-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {showText}
      </motion.h1>

      <motion.p
  className="text-lg text-purple-700 mb-6 z-10 playwrite-hu-2"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
>
  {subText}
</motion.p>

      {/* Flip Card */}
      <div
        style={{ perspective: 1000 }}
        className="w-64 h-64 mb-6 z-10"
        onClick={handleCardClick}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white shadow-xl rounded-2xl flex items-center justify-center text-lg font-semibold text-purple-700"
            style={{ backfaceVisibility: "hidden" }}
          >
            Tap me 👉
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-purple-200 shadow-xl rounded-2xl flex items-center justify-center overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {photoIndex === -1 ? (
              <p className="text-white font-semibold text-lg">
                You’re my favorite person 💖
              </p>
            ) : (
              <motion.div
                key={photoIndex} // <- wrapper key ensures photo + text update
                className="relative w-full h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Photo */}
                <img
                  src={photos[photoIndex]}
                  alt={`Memory ${photoIndex + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Text overlay animation */}
                <motion.div
                  key={`text-${photoIndex}`} // separate key triggers animation
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/30 px-3 py-1 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {photoMessages[photoIndex]}
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Random Message Button */}
      <button
        onClick={randomMessage}
        className="z-10 bg-pink-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-pink-600 transition mt-6"
      >
        Smile pls babygirl🐥✨ 👇
      </button>

      {message && (
        <motion.p
          className="mt-4 text-lg text-purple-800 font-medium z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message}
        </motion.p>
      )}

    </div>
  );
}
