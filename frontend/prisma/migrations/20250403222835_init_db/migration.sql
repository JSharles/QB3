-- CreateTable
CREATE TABLE "SpaceLocation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "floor" TEXT,
    "additionalDetails" TEXT,
    "locationHash" TEXT NOT NULL,
    "zoneHash" TEXT NOT NULL,
    "userWallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpaceLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpaceLocation_locationHash_key" ON "SpaceLocation"("locationHash");
