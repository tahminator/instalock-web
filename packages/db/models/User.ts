export interface User {
  puuid: string;
  riotEntitlement: string | null;
  riotAuth: string | null;
  riotTag: string | null;
  newUser: boolean;
}
