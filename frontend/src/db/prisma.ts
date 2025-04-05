import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// Sets up WebSocket connections for Neon
neonConfig.webSocketConstructor = ws;

const connectionString =
  process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Database URL is not defined");
}

// Crée une pool de connexions avec l'URL choisie
const pool = new Pool({ connectionString });

// Initialise l'adaptateur Prisma pour Neon
const adapter = new PrismaNeon(pool);

// Crée le client Prisma
export const prisma = new PrismaClient({
  adapter,
  // log: ["query"],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
