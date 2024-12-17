import { Prisma, RiotMatchPlayers } from "..";

export type ShallowMatchExclude = Prisma.RiotMatchesGetPayload<{
  select: {
    id: true;
    mapId: true;
    teamRedRoundsWon: true;
    teamBlueRoundsWon: true;
    isCompleted: true;
    gameStart: true;
    gameEnd: true;
    queueId: true;
  };
}>;

export type ShallowMatch = ShallowMatchExclude & {
  characterId: string;
  me: RiotMatchPlayers;
};
