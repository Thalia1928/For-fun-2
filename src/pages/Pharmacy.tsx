import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Beaker,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { herbsData } from "@contracts/herb-data";
import type { HerbData } from "@contracts/herb-data";

type Season = "all" | "spring" | "summer" | "autumn" | "winter";

const seasonConfig = {
  all: { label: "全部", color: "#8B8579" },
  spring: { label: "春", color: "#D4E2A7" },
  summer: { label: "夏", color: "#F5DFE9" },
  autumn: { label: "秋", color: "#FBECDE" },
  winter: { label: "冬", color: "#E9F1F6" },
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Pharmacy() {
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState<Season>("all");
  const [selectedHerb, setSelectedHerb] = useState<HerbData | null>(null);

  const filteredHerbs = useMemo(() => {
    if (selectedSeason === "all") return herbsData;
    return herbsData.filter((h) => h.season === selectedSeason);
  }, [selectedSeason]);

  const seasonLabel = useMemo(() => {
    if (selectedSeason === "all") return "二十四节气";
    const seasonNames: Record<string, string> = {
      spring: "春季", summer: "夏季", autumn: "秋季", winter: "冬季",
    };
    return seasonNames[selectedSeason];
  }, [selectedSeason]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen w-full flex flex-col relative"
      style={{ backgroundColor: "#FAF5EE" }}
    >
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{ backgroundImage: "url(/images/pharmacy-bg.jpg)" }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #FAF5EEe0 0%, #FAF5EEd0 50%, #FAF5EEe0 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div
          className="sticky top-0 z-30 backdrop-blur-xl border-b"
          style={{ backgroundColor: "#FAF5EEe8", borderColor: "#E8E0D6" }}
        >
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-1"
              style={{ color: "#8B8579" }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-body">返回</span>
            </motion.button>
            <div className="flex flex-col items-center">
              <h1
                className="text-xl font-bold tracking-wider font-title"
                style={{ color: "#4A4540" }}
              >
                节气药铺
              </h1>
              <div
                className="w-8 h-0.5 rounded-full mt-0.5"
                style={{ background: "linear-gradient(to right, #BCD27C, #FF89A6, #F2ECB6, #CBD9E8)" }}
              />
            </div>
            <div className="w-12" />
          </div>
          <div className="max-w-lg mx-auto px-4 pb-3 flex gap-2 justify-center">
            {(Object.keys(seasonConfig) as Season[]).map((s) => {
              const cfg = seasonConfig[s];
              const active = selectedSeason === s;
              return (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedSeason(s)}
                  className="px-4 py-1.5 rounded-full text-sm font-body transition-all"
                  style={
                    active
                      ? { backgroundColor: cfg.color, color: "#4A4540" }
                      : { backgroundColor: "#FFFFFF80", color: "#8B8579" }
                  }
                >
                  {cfg.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Cabinet */}
        <div className="flex-1 max-w-lg mx-auto px-4 py-5 w-full">
          <p
            className="text-center text-sm mb-5 font-body"
            style={{ color: "#8B8579" }}
          >
            {seasonLabel} · 共{filteredHerbs.length}味本草
          </p>

          {/* Wooden Cabinet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-4 md:p-5"
            style={{
              background: "linear-gradient(160deg, #C8B4A0, #AD9782)",
              boxShadow: "0 16px 48px rgba(125,96,64,0.35)",
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="h-px flex-1"
                style={{ background: "linear-gradient(to right, transparent, #F5E6D060)" }}
              />
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#C4A07260" }}
                />
                <span
                  className="text-xs font-body tracking-widest"
                  style={{ color: "#F5E6D090" }}
                >
                  百 草 柜
                </span>
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#C4A07260" }}
                />
              </div>
              <div
                className="h-px flex-1"
                style={{ background: "linear-gradient(to left, transparent, #F5E6D060)" }}
              />
            </div>

            {/* Drawer Grid - Colored by season, solid color, thin border, no shadow */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              <AnimatePresence mode="popLayout">
                {filteredHerbs.map((herb) => {
                  const sc = seasonConfig[herb.season];
                  return (
                    <motion.button
                      key={herb.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 1 }}
                      onClick={() => setSelectedHerb(herb)}
                      className="relative group"
                    >
                      <div
                        className="aspect-[3/4] rounded-lg flex flex-col items-center justify-center p-1.5"
                        style={{
                          backgroundColor: sc.color,
                          border: `1.5px solid ${sc.color}`,
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full mb-1"
                          style={{
                            background: "radial-gradient(circle at 35% 35%, #FFF8F0, #F5E6D0, #E0C8A0)",
                            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.15)",
                          }}
                        />
                        <span
                          className="text-[11px] font-semibold leading-tight font-body text-center"
                          style={{ color: "#4A4540" }}
                        >
                          {herb.name}
                        </span>
                        <span
                          className="text-[8px] mt-0.5 font-body"
                          style={{ color: "#8B8579" }}
                        >
                          {herb.solarTerm}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <div
              className="flex items-center justify-center gap-4 mt-4 pt-3"
              style={{ borderTop: "1px solid #6B4F3525" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#A0826D40" }}
              />
              <div
                className="w-14 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, #A0826D30, transparent)",
                }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#A0826D40" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Herb Detail Modal - V7 Style: centered card from bottom */}
        <AnimatePresence>
          {selectedHerb && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
              style={{ backgroundColor: "#2A201840" }}
              onClick={() => setSelectedHerb(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 60, scale: 0.95 }}
                transition={{ type: "spring", damping: 24, stiffness: 280 }}
                className="relative w-full max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                style={{
                  backgroundColor: "#FFFCF8",
                  border: `2px solid ${seasonConfig[selectedHerb.season].color}60`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Corner decorations - season colored */}
                <div
                  className="absolute top-3 left-3 w-5 h-5 z-20"
                  style={{
                    borderTop: `2px solid ${seasonConfig[selectedHerb.season].color}50`,
                    borderLeft: `2px solid ${seasonConfig[selectedHerb.season].color}50`,
                  }}
                />
                <div
                  className="absolute top-3 right-3 w-5 h-5 z-20"
                  style={{
                    borderTop: `2px solid ${seasonConfig[selectedHerb.season].color}50`,
                    borderRight: `2px solid ${seasonConfig[selectedHerb.season].color}50`,
                  }}
                />

                {/* Close */}
                <button
                  onClick={() => setSelectedHerb(null)}
                  className="absolute top-3 right-10 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#4A454040" }}
                >
                  <X className="w-4 h-4 text-white/90" />
                </button>

                {/* Character Image */}
                <div
                  className="relative w-full flex items-end justify-center overflow-hidden pt-8 pb-0"
                  style={{
                    background: `linear-gradient(180deg, ${seasonConfig[selectedHerb.season].color}20, #FFFCF8)`,
                    minHeight: "320px",
                  }}
                >
                  <motion.div
                    className="absolute w-48 h-48 rounded-full"
                    style={{
                      backgroundColor: seasonConfig[selectedHerb.season].color,
                      opacity: 0.15,
                      top: -20,
                      left: -30,
                      filter: "blur(50px)",
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-36 h-36 rounded-full"
                    style={{
                      backgroundColor: "#FFBECE",
                      opacity: 0.12,
                      bottom: 10,
                      right: -20,
                      filter: "blur(40px)",
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />

                  <motion.img
                    src={selectedHerb.characterImage}
                    alt={selectedHerb.name}
                    className="h-[300px] w-auto object-contain relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      opacity: { duration: 0.5 },
                    }}
                  />
                </div>

                {/* Content */}
                <div className="px-5 pb-6 pt-4">
                  {/* Name & Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2
                        className="text-2xl font-bold font-title"
                        style={{ color: "#4A4540" }}
                      >
                        {selectedHerb.name}
                      </h2>
                      <p
                        className="text-xs mt-0.5 font-body"
                        style={{ color: "#8B8579" }}
                      >
                        {selectedHerb.solarTerm}节气 · {selectedHerb.nature}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs text-white font-medium font-body"
                      style={{
                        backgroundColor: seasonConfig[selectedHerb.season].color,
                        opacity: 0.85,
                      }}
                    >
                      {selectedHerb.meridian}
                    </span>
                  </div>

                  {/* Dialogue Box - season colored border */}
                  <div
                    className="rounded-xl p-4 mb-4 relative"
                    style={{
                      backgroundColor: `${seasonConfig[selectedHerb.season].color}12`,
                      border: `1.5px solid ${seasonConfig[selectedHerb.season].color}35`,
                    }}
                  >
                    <div
                      className="absolute -top-1.5 left-7 w-3 h-3 rotate-45"
                      style={{
                        backgroundColor: `${seasonConfig[selectedHerb.season].color}12`,
                        borderTop: `1.5px solid ${seasonConfig[selectedHerb.season].color}35`,
                        borderLeft: `1.5px solid ${seasonConfig[selectedHerb.season].color}35`,
                      }}
                    />
                    <div className="flex items-start gap-2">
                      <BookOpen
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: "#8DA868" }}
                      />
                      <div>
                        <p
                          className="text-sm leading-relaxed font-body"
                          style={{ color: "#4A4540" }}
                        >
                          「{selectedHerb.greeting}」
                        </p>
                        <p
                          className="text-xs mt-1.5 font-body"
                          style={{ color: "#8B857980" }}
                        >
                          —— {selectedHerb.solarTerm} · {selectedHerb.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Knowledge Cards */}
                  <div className="space-y-2.5">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="rounded-xl p-4 cursor-default transition-shadow hover:shadow-md"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E8E0D6",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles
                          className="w-4 h-4"
                          style={{ color: "#D4956B" }}
                        />
                        <h3
                          className="text-sm font-semibold font-body"
                          style={{ color: "#4A4540" }}
                        >
                          功效作用
                        </h3>
                      </div>
                      <p
                        className="text-sm leading-relaxed font-body"
                        style={{ color: "#8B8579" }}
                      >
                        {selectedHerb.effects}
                      </p>
                    </motion.div>

                    {selectedHerb.contraindications && (
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="rounded-xl p-4 cursor-default transition-shadow hover:shadow-md"
                        style={{
                          backgroundColor: "#FF89A608",
                          border: "1px solid #FF89A620",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle
                            className="w-4 h-4"
                            style={{ color: "#FF89A6" }}
                          />
                          <h3
                            className="text-sm font-semibold font-body"
                            style={{ color: "#FF89A6" }}
                          >
                            禁忌提示
                          </h3>
                        </div>
                        <p
                          className="text-sm leading-relaxed font-body"
                          style={{ color: "#8B8579" }}
                        >
                          {selectedHerb.contraindications}
                        </p>
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="rounded-xl p-4 cursor-default transition-shadow hover:shadow-md"
                      style={{
                        backgroundColor: "#BCD27C08",
                        border: "1px solid #BCD27C20",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle
                          className="w-4 h-4"
                          style={{ color: "#8DA868" }}
                        />
                        <h3
                          className="text-sm font-semibold font-body"
                          style={{ color: "#8DA868" }}
                        >
                          配茶推荐
                        </h3>
                      </div>
                      <p
                        className="text-sm leading-relaxed font-body"
                        style={{ color: "#8B8579" }}
                      >
                        {selectedHerb.teaNote}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="rounded-xl p-4 cursor-default transition-shadow hover:shadow-md"
                      style={{
                        backgroundColor: "#CBD9E808",
                        border: "1px solid #CBD9E820",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Info
                          className="w-4 h-4"
                          style={{ color: "#8B8579" }}
                        />
                        <h3
                          className="text-sm font-semibold font-body"
                          style={{ color: "#4A4540" }}
                        >
                          知识卡片
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span
                            className="font-medium font-body text-xs"
                            style={{ color: "#8B8579" }}
                          >
                            性味
                          </span>
                          <p
                            className="mt-0.5 font-body"
                            style={{ color: "#4A4540" }}
                          >
                            {selectedHerb.nature}
                          </p>
                        </div>
                        <div>
                          <span
                            className="font-medium font-body text-xs"
                            style={{ color: "#8B8579" }}
                          >
                            归经
                          </span>
                          <p
                            className="mt-0.5 font-body"
                            style={{ color: "#4A4540" }}
                          >
                            {selectedHerb.meridian}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom rainbow bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: "linear-gradient(to right, #BCD27C40, #FF89A640, #F2ECB640, #CBD9E840, #F2ECB640)",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <div
          className="sticky bottom-0 z-20 py-3 backdrop-blur-xl"
          style={{
            backgroundColor: "#FAF5EEe8",
            borderTop: "1px solid #E8E0D6",
          }}
        >
          <div className="max-w-lg mx-auto px-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate("/tea-room")}
                className="w-full rounded-xl py-5 shadow-lg transition-all font-body text-white"
                style={{
                  backgroundColor: "#8DA868",
                  boxShadow: "0 4px 16px rgba(141,168,104,0.25)",
                }}
              >
                <Beaker className="w-5 h-5 mr-2" />
                前往配茶台
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
