import * as dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

if(!process.env?.DATABASE_URL) throw new Error("Datebase url not set up");

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: "__drizzle_migration",
    schema: "public"
  },
  verbose: true,
  strict: true,
});