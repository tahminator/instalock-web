import { Prisma, PlayerMatch } from "..";

export type ShallowMatchExclude = Prisma.RiotMatchGetPayload<{
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
  characterId?: string;
  me?: PlayerMatch;
};
