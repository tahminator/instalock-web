export type RiotMatchTeamColor = "Red" | "Blue";

export interface RiotMatch {
  id: string;
  mapId: string | null;
  gameVersion: string | null;
  gameStart: Date | null;
  gameEnd: Date | null;
  isCompleted: boolean;
  queueId: string | null;
  isRanked: boolean | null;
  seasonId: string | null;
  roundsPlayed: number | null;
  teamWon: RiotMatchTeamColor | null;
  teamRedRoundsWon: number | null;
  teamBlueRoundsWon: number | null;
  raw: string | null;
}
