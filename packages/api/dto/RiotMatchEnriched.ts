import type { PlayerMatch } from "@instalock/db";
import type { RiotMatch } from "@instalock/db";
import type { getGameModeName } from "@instalock/riot";

export interface RiotMatchEnriched {
  playerData: PlayerMatch | null;
  matchData: Omit<RiotMatch, "raw">;
  gameModeName: ReturnType<typeof getGameModeName>;
  players?: PlayerMatch[];
}
