import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  json,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const herbs = mysqlTable("herbs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  solarTerm: varchar("solar_term", { length: 20 }).notNull(),
  solarTermSlug: varchar("solar_term_slug", { length: 20 }).notNull(),
  season: mysqlEnum("season", ["spring", "summer", "autumn", "winter"]).notNull(),
  characterImage: varchar("character_image", { length: 255 }).notNull(),
  greeting: text("greeting").notNull(),
  nature: varchar("nature", { length: 20 }),
  meridian: varchar("meridian", { length: 100 }),
  effects: text("effects").notNull(),
  contraindications: text("contraindications"),
  teaNote: text("tea_note"),
  order: int("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Herb = typeof herbs.$inferSelect;
export type InsertHerb = typeof herbs.$inferInsert;

export const compatibilities = mysqlTable("compatibilities", {
  id: serial("id").primaryKey(),
  herbA: varchar("herb_a", { length: 50 }).notNull(),
  herbB: varchar("herb_b", { length: 50 }).notNull(),
  isCompatible: mysqlEnum("is_compatible", ["safe", "caution", "forbidden"]).notNull(),
  note: text("note"),
});

export type Compatibility = typeof compatibilities.$inferSelect;

export const recipes = mysqlTable("recipes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  herbs: json("herbs").notNull(),
  effects: text("effects").notNull(),
  drinkNote: text("drink_note"),
  sceneTag: varchar("scene_tag", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = typeof recipes.$inferInsert;

export const savedRecipes = mysqlTable("saved_recipes", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
  recipeData: json("recipe_data").notNull(),
  shareCode: varchar("share_code", { length: 20 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SavedRecipe = typeof savedRecipes.$inferSelect;
