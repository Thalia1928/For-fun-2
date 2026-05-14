import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { savedRecipes } from "../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import {
  herbsData,
  compatibilityData,
  recipesData,
} from "@contracts/herb-data";

export const herbRouter = createRouter({
  list: publicQuery.query(async () => {
    return herbsData.sort((a, b) => a.order - b.order);
  }),

  bySeason: publicQuery
    .input(z.object({ season: z.enum(["spring", "summer", "autumn", "winter"]) }))
    .query(async ({ input }) => {
      return herbsData
        .filter((h) => h.season === input.season)
        .sort((a, b) => a.order - b.order);
    }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return herbsData.find((h) => h.slug === input.slug) || null;
    }),

  checkCompatibility: publicQuery
    .input(z.object({ herbSlugs: z.array(z.string()).min(2).max(3) }))
    .query(async ({ input }) => {
      const { herbSlugs } = input;

      const results: Array<{
        pair: [string, string];
        status: "safe" | "caution" | "forbidden";
        note: string;
      }> = [];

      for (let i = 0; i < herbSlugs.length; i++) {
        for (let j = i + 1; j < herbSlugs.length; j++) {
          const a = herbSlugs[i];
          const b = herbSlugs[j];

          const comp = compatibilityData.find(
            (c) =>
              (c.herbA === a && c.herbB === b) ||
              (c.herbA === b && c.herbB === a)
          );

          if (comp) {
            results.push({
              pair: [a, b],
              status: comp.isCompatible,
              note: comp.note || "",
            });
          } else {
            results.push({
              pair: [a, b],
              status: "safe",
              note: "",
            });
          }
        }
      }

      const overallStatus = results.some((r) => r.status === "forbidden")
        ? "forbidden"
        : results.some((r) => r.status === "caution")
        ? "caution"
        : "safe";

      return {
        pairs: results,
        overall: overallStatus,
      };
    }),

  findRecipe: publicQuery
    .input(z.object({ herbSlugs: z.array(z.string()).min(2).max(3) }))
    .query(async ({ input }) => {
      const { herbSlugs } = input;

      // Find exact match first
      for (const recipe of recipesData) {
        if (herbSlugs.every((slug) => recipe.herbs.includes(slug))) {
          return recipe;
        }
      }

      // Generate generic recipe
      const matchedHerbs = herbsData.filter((h) => herbSlugs.includes(h.slug));
      const names = matchedHerbs.map((h) => h.name);
      const effects = matchedHerbs.map((h) => h.effects.split("。")[0]).join("；");

      return {
        name: `${names.join("·")}养生茶`,
        herbs: herbSlugs,
        effects: `${effects}。多味药材协同作用，综合调理身体。`,
        drinkNote: "建议每日1-2杯，温服。连续饮用2周后间隔3-5天再继续。如有不适请停用。",
        sceneTag: "自定义配方",
      };
    }),

  listRecipes: publicQuery.query(async () => {
    return recipesData;
  }),

  saveRecipe: publicQuery
    .input(
      z.object({
        recipeData: z.object({
          name: z.string(),
          herbs: z.array(z.string()),
          effects: z.string(),
          drinkNote: z.string().optional(),
          sceneTag: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const shareCode = crypto.randomBytes(4).toString("hex").toUpperCase();

      await db.insert(savedRecipes).values({
        recipeData: input.recipeData,
        shareCode,
      });

      return { shareCode };
    }),

  getSavedRecipe: publicQuery
    .input(z.object({ shareCode: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(savedRecipes)
        .where(eq(savedRecipes.shareCode, input.shareCode))
        .limit(1);
      return result[0] || null;
    }),
});
