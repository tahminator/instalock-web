import { PlayerMatch } from "@instalock/db";
import { RiotMatch } from "@instalock/db";
import { getGameModeName } from "@instalock/riot";

export interface RiotMatchDetailed {
  playerData: PlayerMatch | null;
  matchData: Omit<RiotMatch, "raw">;
  gameModeName: ReturnType<typeof getGameModeName>;
  players?: PlayerMatch[];
}
