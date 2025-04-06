"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const confidentialDataSchema = z.object({
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  floor: z.string().optional(),
  additionalDetails: z.string().optional(),
  locationHash: z.string(),
  zoneHash: z.string(),
  userWallet: z.string(),
});

export async function registerConfidentialData(
  input: z.infer<typeof confidentialDataSchema>
) {
  const data = confidentialDataSchema.parse(input);

  try {
    await prisma.spaceLocation.create({
      data: {
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        floor: data.floor,
        additionalDetails: data.additionalDetails,
        locationHash: data.locationHash,
        zoneHash: data.zoneHash,
        userWallet: data.userWallet,
      },
    });

    return { status: "ok" };
  } catch (error) {
    console.error("DB insert error:", error);
    return { status: "error", message: "Database error" };
  }
}

export async function getAvailableZones() {
  try {
    const availableZones = await prisma.spaceLocation.groupBy({
      by: ["city", "zoneHash"],
      _count: {
        id: true,
      },
    });

    const result = availableZones.map((zone) => ({
      city: zone.city,
      zoneHash: zone.zoneHash,
    }));

    return {
      status: "ok",
      data: result,
    };
  } catch (error) {
    console.error("DB query error:", error);
    return {
      status: "error",
      message: "Database error",
    };
  }
}
