import { useRef, useState, useCallback, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Create audio element on mount and try to play
  useEffect(() => {
    const audio = new Audio("/audio/bgm2.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audio.playsInline = true;
    audioRef.current = audio;

    // Track state
    const onPlay = () => setMuted(false);
    const onPause = () => {};
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Attempt unmuted autoplay immediately
    const tryPlay = () => {
      audio.play().then(() => {
        // Success! Unmuted autoplay worked
        setMuted(false);
        setShowHint(false);
      }).catch(() => {
        // Autoplay blocked — try muted autoplay as fallback
        audio.muted = true;
        audio.play().then(() => {
          // Muted autoplay succeeded — wait for user click to unmute
          const unmuteHandler = () => {
            if (audio.muted) {
              audio.muted = false;
              setMuted(false);
              setShowHint(false);
            }
          };
          document.addEventListener("click", unmuteHandler);
          document.addEventListener("touchstart", unmuteHandler);
        }).catch(() => {
          // Even muted autoplay failed — wait for user click to play
          const playHandler = () => {
            audio.muted = false;
            audio.play().catch(() => {});
            setMuted(false);
            setShowHint(false);
          };
          document.addEventListener("click", playHandler, { once: true });
          document.addEventListener("touchstart", playHandler, { once: true });
        });
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(tryPlay, 100);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = "";
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setMuted(false);
    } else {
      audio.pause();
      setMuted(true);
    }
    setShowHint(false);
  }, []);

  return (
    <>
      {/* Hint toast */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="fixed top-16 right-4 z-[59] px-3 py-1.5 rounded-lg text-xs font-body"
            style={{
              backgroundColor: "#FFFCF8e8",
              border: "1px solid #E8E0D6",
              color: "#8B8579",
            }}
          >
            点击页面开启音乐
          </motion.div>
        )}
      </AnimatePresence>
      {/* Music toggle button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={toggle}
        className="fixed top-4 right-4 z-[60] w-10 h-10 rounded-full flex items-center justify-center shadow-md"
        style={{
          backgroundColor: muted ? "#FFFFFFb0" : "#8DA86815",
          border: `1.5px solid ${muted ? "#E8E0D6" : "#8DA86850"}`,
          backdropFilter: "blur(8px)",
        }}
      >
        {muted ? (
          <VolumeX className="w-[18px] h-[18px]" style={{ color: "#8B8579" }} />
        ) : (
          <Volume2 className="w-[18px] h-[18px]" style={{ color: "#8DA868" }} />
        )}
      </motion.button>
    </>
  );
}
