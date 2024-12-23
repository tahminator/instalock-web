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
  });

export const getMatchByUuid = ({ uuid }: { uuid: string }) =>
  db.riotMatch.findUnique({
    where: { id: uuid },
    include: { players: true },
  });
