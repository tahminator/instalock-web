import { db } from "@/lib/db";

export const getAllMatchesByUserIdShallow = ({
  puuid,
}: {
  puuid?: string | null;
}) =>
  db.riotMatch.findMany({
    where: {
      players: {
        some: { playerId: puuid ?? undefined },
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
    orderBy: {
      gameStart: "desc",
    },
  });

export const getMostRecentTierByUserId = ({ puuid }: { puuid: string }) =>
  db.playerMatch.findFirst({
    where: {
      playerId: puuid,
      tier: {
        not: 0,
      },
    },
    orderBy: {
      match: {
        gameStart: "desc",
      },
    },
    select: {
      tier: true,
    },
  });

export const getMatchByUuid = ({ uuid }: { uuid: string }) =>
  db.riotMatch.findUnique({
    where: { id: uuid },
    include: { players: true },
  });
