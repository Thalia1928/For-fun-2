import { useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Clock, Leaf, Feather, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { herbsData } from "@contracts/herb-data";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function RecipeCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  const recipe = (location.state as any)?.recipe;
  const selectedSlugs: string[] = (location.state as any)?.selectedHerbs || [];
  const selectedHerbs = herbsData.filter((h) => selectedSlugs.includes(h.slug));

  if (!recipe) {
    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
        className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF5EE" }}>
        <div className="text-center">
          <p className="font-body mb-4" style={{ color: "#8B8579" }}>还没有生成配方哦</p>
          <Button onClick={() => navigate("/tea-room")} className="rounded-xl font-body text-white"
            style={{ backgroundColor: "#8DA868" }}>去配茶</Button>
        </div>
      </motion.div>
    );
  }

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, { backgroundColor: "#FFFCF8", scale: 2, useCORS: true });
      const link = document.createElement("a");
      link.download = `节气药铺-${recipe.name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // silent fail
    }
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen w-full" style={{ backgroundColor: "#FAF5EE" }}>
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-lg border-b" style={{ backgroundColor: "#FAF5EEe8", borderColor: "#E8E0D6" }}>
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/tea-room")} className="flex items-center gap-1 transition-colors" style={{ color: "#8B8579" }}>
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-body">配茶台</span>
          </motion.button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold tracking-wider font-title" style={{ color: "#4A4540" }}>配方卡片</h1>
            <div className="w-6 h-0.5 rounded-full mt-0.5" style={{ backgroundColor: "#D4956B50" }} />
          </div>
          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Recipe Card - Vertical Chinese Prescription Style */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          ref={cardRef}
          className="relative rounded-2xl overflow-hidden shadow-xl"
          style={{
            background: "linear-gradient(180deg, #FFFCF8 0%, #F5EDE0 50%, #F0E6D4 100%)",
            border: "2px solid #E8E0D6",
          }}>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 z-10" style={{ borderTop: "2px solid #D4956B35", borderLeft: "2px solid #D4956B35" }} />
          <div className="absolute top-4 right-4 w-8 h-8 z-10" style={{ borderTop: "2px solid #D4956B35", borderRight: "2px solid #D4956B35" }} />
          <div className="absolute bottom-4 left-4 w-8 h-8 z-10" style={{ borderBottom: "2px solid #D4956B35", borderLeft: "2px solid #D4956B35" }} />
          <div className="absolute bottom-4 right-4 w-8 h-8 z-10" style={{ borderBottom: "2px solid #D4956B35", borderRight: "2px solid #D4956B35" }} />

          {/* Top watercolor */}
          <div className="relative pt-8 pb-4 overflow-hidden">
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #BCD27C18, #FFBECE10, #CBD9E808, transparent)" }} />
            <motion.div className="absolute w-40 h-40 rounded-full opacity-20" style={{ backgroundColor: "#BCD27C", top: -40, left: -30, filter: "blur(50px)" }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 5, repeat: Infinity }} />
            <motion.div className="absolute w-32 h-32 rounded-full opacity-15" style={{ backgroundColor: "#FFBECE", top: -20, right: -20, filter: "blur(45px)" }}
              animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 7, repeat: Infinity }} />

            {/* Title */}
            <div className="relative z-10 text-center px-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Feather className="w-4 h-4" style={{ color: "#D4956B60" }} />
                <span className="text-xs font-body tracking-widest" style={{ color: "#8B8579" }}>{recipe.sceneTag || "自定义配方"}</span>
                <Feather className="w-4 h-4" style={{ color: "#D4956B60" }} />
              </div>
              <h2 className="text-3xl font-bold font-title tracking-wider" style={{ color: "#4A4540" }}>
                {recipe.name}
              </h2>
              <div className="w-16 h-0.5 mx-auto mt-2 rounded-full" style={{ background: "linear-gradient(to right, transparent, #D4956B50, transparent)" }} />
            </div>
          </div>

          {/* Herb Characters */}
          <div className="px-6 py-4">
            <div className="flex justify-center gap-5">
              {selectedHerbs.map((herb, i) => (
                <motion.div key={herb.slug} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.1 + i * 0.15, type: "spring" }}
                  className="flex flex-col items-center">
                  <div className="relative w-20 h-28 rounded-xl overflow-hidden bg-white shadow-sm"
                    style={{ border: "2px solid #E8E0D6", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
                    <img src={herb.characterImage} alt={herb.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(141,168,104,0.06) 100%)" }} />
                  </div>
                  <span className="text-sm font-medium mt-2 font-body" style={{ color: "#4A4540" }}>{herb.name}</span>
                  <span className="text-[10px] font-body" style={{ color: "#8B8579" }}>{herb.solarTerm}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="px-8 flex items-center gap-3 py-2">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #D4956B25)" }} />
            <Star className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#D4956B50" }} />
            <span className="text-xs font-body flex-shrink-0" style={{ color: "#8B857980" }}>功 效</span>
            <Star className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#D4956B50" }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #D4956B25)" }} />
          </div>

          {/* Effects */}
          <div className="px-6 py-3">
            <div className="rounded-xl p-4" style={{
              background: "linear-gradient(135deg, rgba(188,210,124,0.07), rgba(255,190,206,0.05))",
              border: "1px solid rgba(188,210,124,0.15)",
            }}>
              <p className="text-sm leading-relaxed font-body" style={{ color: "#4A4540" }}>{recipe.effects}</p>
            </div>
          </div>

          {/* Drink Note */}
          {recipe.drinkNote && (
            <div className="px-6 pb-4">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#F2ECB630" }}>
                  <Clock className="w-3.5 h-3.5" style={{ color: "#D4956B" }} />
                </div>
                <p className="text-sm leading-relaxed font-body" style={{ color: "#8B8579" }}>{recipe.drinkNote}</p>
              </div>
            </div>
          )}

          {/* Red Stamp Area */}
          <div className="px-6 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#BCD27C18", border: "1px solid #BCD27C30" }}>
                <Leaf className="w-4 h-4" style={{ color: "#8DA868" }} />
              </div>
              <div>
                <span className="text-sm font-medium font-title" style={{ color: "#4A4540" }}>节气药铺</span>
                <p className="text-[9px] font-body" style={{ color: "#8B857980" }}>传承中医药文化</p>
              </div>
            </div>
            {/* Vintage stamp */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-dashed rotate-12"
              style={{ borderColor: "#FF89A640", backgroundColor: "#FF89A608" }}>
              <span className="text-xs font-bold font-title rotate-0" style={{ color: "#FF89A670" }}>良方</span>
            </div>
          </div>

          {/* Bottom gradient */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(to right, #BCD27C30, #FFBECE30, #CBD9E830, #F2ECB630, #FF89A620)" }} />
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleDownload} variant="outline"
              className="w-full rounded-xl py-5 font-body transition-all"
              style={{ borderColor: "#8DA86840", color: "#8DA868" }}>
              <Download className="w-4 h-4 mr-2" />
              保存图片
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={() => navigate("/pharmacy")}
              className="w-full rounded-xl py-5 font-body text-white transition-all"
              style={{ backgroundColor: "#8DA868", boxShadow: "0 4px 16px rgba(141,168,104,0.2)" }}>
              <ArrowRight className="w-4 h-4 mr-2" />
              返回药铺
            </Button>
          </motion.div>
        </div>

        <div className="mt-4 text-center pb-8">
          <Button variant="ghost" onClick={() => navigate("/pharmacy")}
            className="font-body transition-colors hover:opacity-70" style={{ color: "#8B8579" }}>
            返回药铺继续探索
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
