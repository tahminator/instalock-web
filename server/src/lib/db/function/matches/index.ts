import { db } from "@/lib/db";

export const getAllMatchesByUserIdShallow = ({
  puuid,
}: {
  puuid?: string | null;
}) =>
  db.riotMatches.findMany({
    where: {
      users: {
        some: { riotPuuid: puuid },
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
