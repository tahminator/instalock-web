-- AlterTable
ALTER TABLE "_RiotMatchPlayersToRiotMatches" ADD CONSTRAINT "_RiotMatchPlayersToRiotMatches_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RiotMatchPlayersToRiotMatches_AB_unique";

-- AlterTable
ALTER TABLE "_RiotMatchesToUser" ADD CONSTRAINT "_RiotMatchesToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RiotMatchesToUser_AB_unique";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
