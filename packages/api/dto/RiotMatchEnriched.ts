import type { PlayerMatch } from "@instalock/db";
import type { RiotMatch } from "@instalock/db";
import type { getGameModeName } from "@instalock/riot";

export interface RiotMatchEnriched {
  playerData: PlayerMatch | null;
  matchData: Omit<RiotMatch, "raw" | "gameStart" | "gameEnd"> & {
    gameStart: string | null;
    gameEnd: string | null;
  };
  gameModeName: ReturnType<typeof getGameModeName>;
  players?: PlayerMatch[];
}
