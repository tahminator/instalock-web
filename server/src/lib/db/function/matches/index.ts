import { db } from "@/lib/db";

export const getAllMatchesByUserIdShallow = ({ userId }: { userId: string }) =>
  db.riotMatches.findMany({
    where: {
      users: {
        some: { id: userId },
      },
    },
    select: {
      id: true,
      mapId: true,
      teamRedRoundsWon: true,
      teamBlueRoundsWon: true,
      isCompleted: true,
      gameStart: true,
      gameEnd: true,
      queueId: true,
    },
  });

export const getAllMatchesByUserId = ({ userId }: { userId: string }) =>
  db.riotMatches.findMany({
    where: {
      users: {
        some: { id: userId },
      },
    },
  });
