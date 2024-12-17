/*
  Warnings:

  - The primary key for the `_RiotMatchPlayersToRiotMatches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_RiotMatchesToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_RiotMatchPlayersToRiotMatches` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_RiotMatchesToUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `puuid` to the `RiotMatchPlayers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RiotMatchPlayers" ADD COLUMN     "puuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "_RiotMatchPlayersToRiotMatches" DROP CONSTRAINT "_RiotMatchPlayersToRiotMatches_AB_pkey";

-- AlterTable
ALTER TABLE "_RiotMatchesToUser" DROP CONSTRAINT "_RiotMatchesToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_RiotMatchPlayersToRiotMatches_AB_unique" ON "_RiotMatchPlayersToRiotMatches"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_RiotMatchesToUser_AB_unique" ON "_RiotMatchesToUser"("A", "B");
