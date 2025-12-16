/*
  Warnings:

  - A unique constraint covering the columns `[playerId,matchId]` on the table `PlayerMatch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayerMatch_playerId_matchId_key" ON "PlayerMatch"("playerId", "matchId");
