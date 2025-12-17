import { PlayerMatch } from "@instalock/db";
import { RiotMatch } from "@instalock/db";
import { getGameModeName } from "@instalock/riot";

export interface RiotMatchEnriched {
  playerData: PlayerMatch | null;
  matchData: Omit<RiotMatch, "raw">;
  gameModeName: ReturnType<typeof getGameModeName>;
  players?: PlayerMatch[];
}
