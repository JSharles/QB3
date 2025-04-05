import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const connectionString =
  `${process.env.NEON_DATABASE_URL}` || `${process.env.DATABASE_URL}`;

if (!connectionString) {
  throw new Error("Database URL is not defined");
}

const pool = new Pool({ connectionString });

const adapter = new PrismaNeon(pool);

export const prisma = new PrismaClient({
  adapter,
  log: ["query"],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
