import { RiotMatchTeamColor } from "./RiotMatch";

export interface PlayerMatch {
  id: string;
  /**
   * joins on User.puuid
   */
  playerId: string;
  /**
   * joins on RiotMatch.id
   */
  matchId: string;
  riotTag: string | null;
  teamId: string | null;
  characterId: string | null;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
  tier: number | null;
  playerCard: string | null;
  playerTitle: string | null;
  teamColor: RiotMatchTeamColor | null;
  teamWon: boolean | null;
  teamRoundsWon: number | null;
}
