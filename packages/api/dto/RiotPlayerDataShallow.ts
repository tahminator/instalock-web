import { RiotPlayerData } from "./RiotPlayerData";

export interface RiotPlayerDataShallow
  extends Pick<RiotPlayerData, "puuid" | "riotTag"> {}
