import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle(sql);
