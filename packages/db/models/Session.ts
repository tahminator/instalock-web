export interface Session {
  id: string;
  /**
   * join to User.puuid
   */
  userId: string;
  expiresAt: string;
}
