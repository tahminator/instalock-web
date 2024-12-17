-- CreateEnum
CREATE TYPE "RiotMatchTeamColor" AS ENUM ('Red', 'Blue');

-- Drop the foreign key constraint first
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "RiotMatches" (
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
    "riotMatchPlayersId" TEXT,

    CONSTRAINT "RiotMatches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiotMatchRound" (
    "id" TEXT NOT NULL,
    "riotMatchesId" TEXT NOT NULL,

    CONSTRAINT "RiotMatchRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiotMatchPlayers" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "RiotMatchPlayers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RiotMatchesToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RiotMatchPlayersToRiotMatches" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RiotMatchesToUser_AB_unique" ON "_RiotMatchesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RiotMatchesToUser_B_index" ON "_RiotMatchesToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RiotMatchPlayersToRiotMatches_AB_unique" ON "_RiotMatchPlayersToRiotMatches"("A", "B");

-- CreateIndex
CREATE INDEX "_RiotMatchPlayersToRiotMatches_B_index" ON "_RiotMatchPlayersToRiotMatches"("B");

-- AddForeignKey
ALTER TABLE "RiotMatchRound" ADD CONSTRAINT "RiotMatchRound_riotMatchesId_fkey" FOREIGN KEY ("riotMatchesId") REFERENCES "RiotMatches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RiotMatchesToUser" ADD CONSTRAINT "_RiotMatchesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "RiotMatches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RiotMatchesToUser" ADD CONSTRAINT "_RiotMatchesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RiotMatchPlayersToRiotMatches" ADD CONSTRAINT "_RiotMatchPlayersToRiotMatches_A_fkey" FOREIGN KEY ("A") REFERENCES "RiotMatchPlayers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RiotMatchPlayersToRiotMatches" ADD CONSTRAINT "_RiotMatchPlayersToRiotMatches_B_fkey" FOREIGN KEY ("B") REFERENCES "RiotMatches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
