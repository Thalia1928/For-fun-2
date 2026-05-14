import { motion } from "framer-motion";

const colors = ["#FF89A6", "#BCD27C", "#FFBECE", "#CBD9E8", "#F2ECB6", "#D4956B"];

const circles = [
  { size: 10, x: "8%", color: 0, delay: 0, dur: 14, blur: 2 },
  { size: 8, x: "20%", color: 1, delay: 2, dur: 18, blur: 1 },
  { size: 12, x: "35%", color: 2, delay: 1, dur: 12, blur: 3 },
  { size: 7, x: "50%", color: 3, delay: 3, dur: 16, blur: 1 },
  { size: 14, x: "65%", color: 4, delay: 0.5, dur: 13, blur: 2 },
  { size: 9, x: "78%", color: 5, delay: 4, dur: 15, blur: 2 },
  { size: 11, x: "90%", color: 0, delay: 1.5, dur: 17, blur: 3 },
  { size: 6, x: "15%", color: 3, delay: 5, dur: 20, blur: 1 },
  { size: 13, x: "45%", color: 1, delay: 3.5, dur: 11, blur: 2 },
  { size: 8, x: "82%", color: 4, delay: 6, dur: 14, blur: 1 },
];

const leaves = [
  { x: "12%", color: 1, delay: 0, dur: 22 },
  { x: "38%", color: 0, delay: 5, dur: 26 },
  { x: "62%", color: 3, delay: 3, dur: 20 },
  { x: "88%", color: 4, delay: 8, dur: 24 },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: c.size,
            height: c.size,
            left: c.x,
            backgroundColor: colors[c.color],
            filter: `blur(${c.blur}px)`,
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.35, 0.3, 0.15, 0],
            x: [0, 20, -15, 10, -5, 0],
          }}
          transition={{
            duration: c.dur,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      {leaves.map((l, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute"
          style={{
            width: 16,
            height: 10,
            left: l.x,
            borderRadius: "50% 0 50% 0",
            backgroundColor: colors[l.color],
            opacity: 0.12,
          }}
          initial={{ y: "120vh", rotate: 0, opacity: 0 }}
          animate={{
            y: "-20vh",
            rotate: [0, 90, 180, 270, 360],
            opacity: [0, 0.2, 0.15, 0.08, 0],
            x: [0, 30, -20, 15, -10, 0],
          }}
          transition={{
            duration: l.dur,
            delay: l.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
