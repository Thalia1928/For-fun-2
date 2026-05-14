import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

import {
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  RotateCcw,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { herbsData, recipesData, compatibilityData } from "@contracts/herb-data";

function getHerbName(slug: string) {
  return herbsData.find((h) => h.slug === slug)?.name || slug;
}

function checkLocalCompatibility(slugs: string[]) {
  const results: Array<{
    pair: [string, string];
    status: "safe" | "caution" | "forbidden";
    note: string;
  }> = [];

  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      const nameA = getHerbName(slugs[i]);
      const nameB = getHerbName(slugs[j]);
      const comp = compatibilityData.find(
        (c) =>
          (c.herbA === nameA && c.herbB === nameB) ||
          (c.herbA === nameB && c.herbB === nameA)
      );

      if (comp) {
        results.push({ pair: [nameA, nameB], status: comp.isCompatible, note: comp.note });
      } else {
        results.push({ pair: [nameA, nameB], status: "safe", note: "" });
      }
    }
  }

  const overall = results.some((r) => r.status === "forbidden")
    ? "forbidden"
    : results.some((r) => r.status === "caution")
    ? "caution"
    : "safe";

  return { pairs: results, overall };
}

function findLocalRecipe(slugs: string[]) {
  for (const recipe of recipesData) {
    if (slugs.every((slug) => recipe.herbs.includes(slug))) {
      return recipe;
    }
  }

  const matchedHerbs = herbsData.filter((h) => slugs.includes(h.slug));
  const names = matchedHerbs.map((h) => h.name);
  const effects = matchedHerbs.map((h) => h.effects.split("。")[0]).join("；");

  return {
    name: `${names.join("·")}养生茶`,
    herbs: slugs,
    effects: `${effects}。多味药材协同作用，综合调理身体。`,
    drinkNote: "建议每日1-2杯，温服。连续饮用2周后间隔3-5天再继续。如有不适请停用。",
    sceneTag: "自定义配方",
  };
}

export default function TeaRoom() {
  const navigate = useNavigate();
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);

  const selectedHerbs = useMemo(
    () => herbsData.filter((h) => selectedSlugs.includes(h.slug)),
    [selectedSlugs]
  );

  const compatibilityResult = useMemo(() => {
    if (selectedSlugs.length < 2) return null;
    return checkLocalCompatibility(selectedSlugs);
  }, [selectedSlugs]);

  const toggleHerb = (slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
    setChecking(false);
  };

  const clearAll = () => {
    setSelectedSlugs([]);
    setChecking(false);
  };

  const handleCheck = () => setChecking(true);

  const handleGenerate = () => {
    if (selectedSlugs.length < 2) return;
    const recipe = findLocalRecipe(selectedSlugs);
    navigate("/recipe", { state: { recipe, selectedHerbs: selectedSlugs } });
  };

  const overallStatus = compatibilityResult?.overall || "safe";
  const canGenerate =
    selectedSlugs.length >= 2 &&
    selectedSlugs.length <= 3 &&
    overallStatus !== "forbidden";

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen w-full flex flex-col" style={{ backgroundColor: "#FAF5EE" }}>
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-lg border-b border-[#E8E2D6]" style={{ backgroundColor: "#FAF5EEe8" }}>
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/pharmacy")} className="flex items-center gap-1 text-[#7A7569] hover:text-[#3D3B36] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">药铺</span>
          </button>
          <h1 className="text-xl font-bold text-[#3D3B36] tracking-wider font-title">配茶台</h1>
          <button onClick={clearAll} className="flex items-center gap-1 text-[#7A7569] hover:text-[#D94F4F] transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">清空</span>
          </button>
        </div>
      </div>

      {/* Tea Table */}
      <div className="max-w-lg mx-auto px-4 py-6 w-full flex-1">
        <div className="bg-white rounded-2xl p-6 border border-[#E8E0D6] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-5 h-5 text-[#C48A6B]" />
            <h2 className="text-lg font-semibold text-[#3D3B36] font-body">配茶台</h2>
            <span className="text-xs text-[#7A7569] ml-auto">已选 {selectedSlugs.length}/3</span>
          </div>

          {/* Selected Slots */}
          <div className="flex justify-center gap-4 mb-6">
            {[0, 1, 2].map((slot) => {
              const herb = selectedHerbs[slot];
              return (
                <motion.div key={slot} layout
                  className={`relative w-20 h-24 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    herb ? "border-[#6B8E5A]/40 bg-[#6B8E5A]/5" : "border-dashed border-[#E8E0D6] bg-[#F9F7F2]"
                  }`}>
                  {herb ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8E0D6] mb-1">
                        <img src={herb.characterImage} alt={herb.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-[#3D3B36] font-medium font-body">{herb.name}</span>
                      <button onClick={() => toggleHerb(herb.slug)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D94F4F] text-white flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ) : (
                    <span className="text-2xl text-[#E8E2D5]">+</span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Status */}
          <AnimatePresence mode="wait">
            {selectedSlugs.length === 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-sm text-[#7A7569]/70 font-body">
                从下方选择2-3味药材开始配茶
              </motion.p>
            )}
            {selectedSlugs.length === 1 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-sm text-[#C48A6B] font-body">
                还需至少1味药材
              </motion.p>
            )}
            {checking && selectedSlugs.length >= 2 && compatibilityResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`rounded-xl p-3 text-sm ${
                  overallStatus === "forbidden"
                    ? "bg-[#D94F4F]/10 text-[#D94F4F] border border-[#D94F4F]/20"
                    : overallStatus === "caution"
                    ? "bg-[#C48A6B]/10 text-[#C48A6B] border border-[#C48A6B]/20"
                    : "bg-[#6B8E5A]/10 text-[#6B8E5A] border border-[#6B8E5A]/20"
                }`}>
                <div className="flex items-center gap-2">
                  {overallStatus === "forbidden" ? <AlertTriangle className="w-4 h-4 flex-shrink-0" /> :
                   overallStatus === "caution" ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> :
                   <Check className="w-4 h-4 flex-shrink-0" />}
                  <span className="font-medium">
                    {overallStatus === "forbidden" ? "配伍禁忌：" :
                     overallStatus === "caution" ? "配伍提醒：" : "配伍安全："}
                  </span>
                </div>
                {compatibilityResult.pairs.filter((p) => p.status !== "safe").map((pair, i) => (
                  <p key={i} className="mt-1 ml-6 text-xs">{pair.pair[0]} + {pair.pair[1]}：{pair.note}</p>
                ))}
                {overallStatus === "safe" && <p className="mt-1 ml-6 font-body">所选药材可以安全配伍</p>}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          {selectedSlugs.length >= 2 && (
            <div className="flex gap-3 mt-4">
              <Button onClick={handleCheck} variant="outline"
                className="flex-1 border-[#C48A6B]/30 text-[#C48A6B] hover:bg-[#C48A6B]/10 rounded-xl font-body">
                <FlaskConical className="w-4 h-4 mr-2" />
                检查配伍
              </Button>
              <Button onClick={handleGenerate} disabled={!canGenerate}
                className="flex-1 bg-[#6B8E5A] hover:bg-[#5A7A4A] text-white rounded-xl disabled:opacity-50 font-body">
                <Sparkles className="w-4 h-4 mr-2" />
                生成配方
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Herb Selector */}
      <div className="sticky bottom-0 z-20 backdrop-blur-lg border-t border-[#E8E0D6]" style={{ backgroundColor: "#FAF5EEe8" }}>
        <div className="max-w-lg mx-auto px-4 py-3">
          <p className="text-xs text-[#7A7569] mb-2 font-body">点击选择药材（最多3味）</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {herbsData.map((herb) => {
              const isSelected = selectedSlugs.includes(herb.slug);
              const isDisabled = !isSelected && selectedSlugs.length >= 3;
              return (
                <motion.button key={herb.slug} whileTap={{ scale: 0.9 }}
                  onClick={() => !isDisabled && toggleHerb(herb.slug)} disabled={isDisabled}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[64px] ${
                    isSelected ? "bg-[#6B8E5A]/15 border-2 border-[#6B8E5A]/40" :
                    isDisabled ? "opacity-40 border-2 border-transparent" :
                    "bg-white border-2 border-transparent hover:border-[#E8E0D6]"
                  }`}>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isSelected ? "border-[#6B8E5A]" : "border-[#E8E0D6]"}`}>
                      <img src={herb.characterImage} alt={herb.name} className="w-full h-full object-cover" />
                    </div>
                    {isSelected && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#6B8E5A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#3D3B36] font-body">{herb.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
