import {
  AutoGenMatchMeta,
  EntitlementApiType,
  PartyDetailsApiType,
  PlayerData,
  RiotCurrentGameApiType,
  RiotCurrentGameDataType,
  RiotMatchInfoType,
  RiotPreGameApiType,
  RiotPreGameDataType,
  RiotUserInfoType,
} from ".";

// Strip the json method from the type.
export type _Response<T> = Omit<Response, "json"> & {
  json: () => Promise<T>;
};

export type Impl = "real" | "mock" | "mock_match_found";

export interface BaseAuth {
  authToken: string;
  entitlementToken: string;
}

export interface PuuidAuthRequest extends BaseAuth {
  puuid: string;
}

export interface CompetitiveUpdatesRequest extends PuuidAuthRequest {
  startIndex?: number;
  endIndex?: number;
}

export interface PlayerByPuuidRequest extends BaseAuth {
  playerPuuids: string[];
}

export interface PreGameDetailsRequest extends BaseAuth {
  preMatchId: string;
}

export interface CurrentGameDetailsRequest extends BaseAuth {
  currentMatchId: string;
}

export interface MatchDetailsRequest extends BaseAuth {
  matchId: string;
}

export interface LockAgentRequest extends BaseAuth {
  agentId: string;
  preMatchId: string;
}

export interface IRiotClient {
  /**
   * Get the user info via an auth token.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/player-info)
   */
  getUserInfo(authToken: string): Promise<_Response<RiotUserInfoType>>;

  /**
   * Get the entitlement token via an auth token.
   *
   * You will likely need both tokens for most routes that require authentication.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/entitlement)
   */
  getEntitlement(authToken: string): Promise<_Response<EntitlementApiType>>;

  /**
   * Get an array of matches (requires player UUID, authentication token, and entitlement token).
   * Supports pagination
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/competitive-updates)
   */
  getCompetitiveUpdates(
    params: CompetitiveUpdatesRequest,
  ): Promise<_Response<RiotMatchInfoType>>;

  /**
   * Get basic player data via an array of PUUIDs.
   * This basically lets you confirm if the users exists.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/name-service)
   */
  getPlayerByPuuid(
    params: PlayerByPuuidRequest,
  ): Promise<_Response<PlayerData[]>>;

  /**
   * Fetch the pre-match ID (if exists) via a PUUID.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/pre-game-player)
   */
  getPreGameMatchId(
    params: PuuidAuthRequest,
  ): Promise<_Response<RiotPreGameApiType>>;

  /**
   * Retrieve full pre-match details via a preMatchId
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/pre-game-match)
   */
  getPreGameMatchDetails(
    params: PreGameDetailsRequest,
  ): Promise<_Response<RiotPreGameDataType>>;

  /**
   * Fetch the current match ID (if exists) via a PUUID.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/current-game-player)
   */
  getCurrentGameMatchId(
    params: PuuidAuthRequest,
  ): Promise<_Response<RiotCurrentGameApiType>>;

  /**
   * Retrieve full current match details via a currentMatchId
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/current-game-match)
   */
  getCurrentGameMatchDetails(
    params: CurrentGameDetailsRequest,
  ): Promise<_Response<RiotCurrentGameDataType>>;

  /**
   * Attempt to lock an agent using a valid agentId. You must pass a preMatchId.
   *
   * @note This only returns a boolean based on whether or not the action was accepted by
   * Riot's servers or not. This does NOT mean the agent was successfully locked. You should
   * instead re-fetch the pre-match details and display the new changes.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/lock-character)
   */
  lockAgent(params: LockAgentRequest): Promise<{ success: boolean }>;

  /**
   * TODO: Add docs
   */
  getMatchDetails(
    params: MatchDetailsRequest,
  ): Promise<_Response<AutoGenMatchMeta>>;

  /**
   * Fetch party details, if exists, for a given PUUID.
   *
   * @note - This only works for your own PUUID, not others.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/party-player)
   *
   */
  getPartyDetailsByPuuid(
    params: PuuidAuthRequest,
  ): Promise<_Response<PartyDetailsApiType>>;
}
