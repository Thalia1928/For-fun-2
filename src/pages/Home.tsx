import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Home() {
  const navigate = useNavigate();

  const seasons = [
    { image: "/images/season-spring-v3.jpg", label: "立春·雨水·惊蛰", sub: "春分·清明·谷雨" },
    { image: "/images/season-summer-v3.jpg", label: "立夏·小满·芒种", sub: "夏至·小暑·大暑" },
    { image: "/images/season-autumn-v3.jpg", label: "立秋·处暑·白露", sub: "秋分·寒露·霜降" },
    { image: "/images/season-winter-v3.jpg", label: "立冬·小雪·大雪", sub: "冬至·小寒·大寒" },
  ];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: "#FAF5EE" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url(/images/pharmacy-bg.jpg)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EE]/70 via-transparent to-[#FAF5EE]/85" />

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full opacity-20"
            style={{
              width: 6 + Math.random() * 8,
              height: 6 + Math.random() * 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ["#FF89A6", "#BCD27C", "#FFBECE", "#CBD9E8", "#F2ECB6"][i % 5],
            }}
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: i * 0.5 }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-wider font-title" style={{ color: "#4A4540" }}>
          节气药铺
        </motion.h1>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="w-20 h-0.5 rounded-full my-4" style={{ backgroundColor: "#D4956B" }} />

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl tracking-widest font-body" style={{ color: "#8B8579" }}>
          二十四节气养生茶互动体验
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm mt-3 mb-10 max-w-md leading-relaxed" style={{ color: "#8B857999" }}>
          走进二十四节气药铺，结识二十四味本草精灵<br />抓药配茶，生成你的专属节气养生配方
        </motion.p>

        {/* Four Seasons */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-2.5 mb-10">
          {seasons.map((s, i) => (
            <motion.div key={i} className="flex flex-col items-center"
              animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}>
              <div className="rounded-full overflow-hidden shadow-md" style={{ width: 44, height: 44 }}>
                <img src={s.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-1.5">
                <div className="text-[8px] font-body leading-tight" style={{ color: "#8B8579" }}>{s.label}</div>
                <div className="text-[8px] font-body leading-tight" style={{ color: "#8B8579" }}>{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
          <Button onClick={() => navigate("/pharmacy")} size="lg"
            className="px-10 py-6 text-lg text-white rounded-full shadow-lg transition-all hover:scale-105 font-body"
            style={{ backgroundColor: "#8DA868", boxShadow: "0 4px 20px rgba(141,168,104,0.3)" }}>
            进入药铺
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 text-xs flex flex-col items-center gap-1" style={{ color: "#8B857980" }}>
          <p className="font-body">点击抽屉 · 认识本草精灵 · 自由配茶 · 生成配方卡片</p>
          <p className="font-body">传承中医药文化 · 创新节气养生</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
