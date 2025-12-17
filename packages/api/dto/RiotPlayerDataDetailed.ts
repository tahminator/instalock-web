import { RiotMatchEnriched } from "./RiotMatchEnriched";

export interface RiotPlayerDataDetailed {
  riotTag: string | null;
  puuid: string;
  name: string | null;
  rank: number | null;
  rankName: string | null;
  matches: RiotMatchEnriched[];
}
