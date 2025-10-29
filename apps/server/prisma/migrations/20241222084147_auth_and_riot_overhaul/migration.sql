-- CreateEnum
CREATE TYPE "RiotMatchTeamColor" AS ENUM ('Red', 'Blue');

-- CreateTable
CREATE TABLE "User" (
    "puuid" TEXT NOT NULL,
    "riotEntitlement" TEXT,
    "riotAuth" TEXT,
    "riotTag" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMatch" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "riotTag" TEXT,
    "teamId" TEXT,
    "characterId" TEXT,
    "kills" INTEGER,
    "deaths" INTEGER,
    "assists" INTEGER,
    "tier" INTEGER,
    "playerCard" TEXT,
    "playerTitle" TEXT,
    "teamColor" "RiotMatchTeamColor",
    "teamWon" BOOLEAN,
    "teamRoundsWon" INTEGER,

    CONSTRAINT "PlayerMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiotMatch" (
    "id" TEXT NOT NULL,
    "mapId" TEXT,
    "gameVersion" TEXT,
    "gameStart" TIMESTAMP(3),
    "gameEnd" TIMESTAMP(3),
    "isCompleted" BOOLEAN,
    "queueId" TEXT,
    "isRanked" BOOLEAN,
    "seasonId" TEXT,
    "roundsPlayed" INTEGER,
    "teamWon" "RiotMatchTeamColor",
    "teamRedRoundsWon" INTEGER,
    "teamBlueRoundsWon" INTEGER,

    CONSTRAINT "RiotMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_puuid_key" ON "User"("puuid");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatch" ADD CONSTRAINT "PlayerMatch_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatch" ADD CONSTRAINT "PlayerMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "RiotMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
