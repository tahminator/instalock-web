import { RiotPreGameApiType, RiotPreGameDataType } from "..";
import { _Response } from "../types";
import { RiotClientImpl } from "../impl";
import {
  CompetitiveUpdatesRequest,
  CurrentGameDetailsRequest,
  Impl,
  IRiotClient,
  LockAgentRequest,
  MatchDetailsRequest,
  PlayerByPuuidRequest,
  PreGameDetailsRequest,
  PuuidAuthRequest,
} from "../types";
import { GET_PRE_GAME_MATCH_ID_FOUND } from "./json/getPreGameMatchId/FOUND";
import { GET_PRE_GAME_MATCH_ID_NOT_FOUND } from "./json/getPreGameMatchId/NOT_FOUND";
import { GET_PRE_GAME_MATCH_DETAILS_FOUND } from "./json/getPreGameMatchDetails/FOUND";

export class MockRiotClient extends RiotClientImpl {
  constructor(private readonly impl: Impl) {
    super();
  }

  /**
   * Get the user info via an auth token.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/player-info)
   */
  async getUserInfo(authToken: string) {
    return RiotClientImpl.getUserInfo(authToken);
  }

  /**
   * Get the entitlement token via an auth token.
   *
   * You will likely need both tokens for most routes that require authentication.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/entitlement)
   */
  async getEntitlement(authToken: string) {
    return RiotClientImpl.getEntitlement(authToken);
  }

  /**
   * Get an array of matches (requires player UUID, authentication token, and entitlement token).
   * Supports pagination
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/competitive-updates)
   */
  async getCompetitiveUpdates(props: CompetitiveUpdatesRequest) {
    return RiotClientImpl.getCompetitiveUpdates(props);
  }

  /**
   * Get basic player data via an array of PUUIDs.
   * This basically lets you confirm if the users exists.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/name-service)
   */
  async getPlayerByPuuid(props: PlayerByPuuidRequest) {
    return RiotClientImpl.getPlayerByPuuid(props);
  }

  /**
   * Fetch the pre-match ID (if exists) via a PUUID.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/pre-game-player)
   */
  async getPreGameMatchId(props: PuuidAuthRequest) {
    switch (this.impl) {
      case "mock_match_found": {
        const json = GET_PRE_GAME_MATCH_ID_FOUND satisfies RiotPreGameApiType;
        return new Response(JSON.stringify(json), {
          status: 200,
        }) satisfies _Response<RiotPreGameApiType>;
      }
      case "mock": {
        const json =
          GET_PRE_GAME_MATCH_ID_NOT_FOUND satisfies RiotPreGameApiType;
        return new Response(JSON.stringify(json), {
          status: 200,
        }) satisfies _Response<RiotPreGameApiType>;
      }
      case "real":
        return RiotClientImpl.getPreGameMatchId(props);
    }
  }

  /**
   * Retrieve full pre-match details via a preMatchId
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/pre-game-match)
   */
  async getPreGameMatchDetails(props: PreGameDetailsRequest) {
    switch (this.impl) {
      case "mock_match_found": {
        const json =
          GET_PRE_GAME_MATCH_DETAILS_FOUND satisfies RiotPreGameDataType;
        return new Response(JSON.stringify(json), {
          status: 200,
        }) satisfies _Response<RiotPreGameDataType>;
      }
      case "mock":
      case "real":
        return RiotClientImpl.getPreGameMatchDetails(props);
    }
  }

  /**
   * Fetch the current match ID (if exists) via a PUUID.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/current-game-player)
   */
  async getCurrentGameMatchId(props: PuuidAuthRequest) {
    return RiotClientImpl.getCurrentGameMatchId(props);
  }

  /**
   * Retrieve full current match details via a currentMatchId
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/current-game-match)
   */
  async getCurrentGameMatchDetails(props: CurrentGameDetailsRequest) {
    return RiotClientImpl.getCurrentGameMatchDetails(props);
  }

  /**
   * Attempt to lock an agent using a valid agentId. You must pass a preMatchId.
   *
   * @note This only returns a boolean based on whether or not the action was accepted by
   * Riot's servers or not. This does NOT mean the agent was successfully locked. You should
   * instead re-fetch the pre-match details and display the new changes.
   *

   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/lock-character)
   */
  async lockAgent(props: LockAgentRequest) {
    return RiotClientImpl.lockAgent(props);
  }

  async getMatchDetails(props: MatchDetailsRequest) {
    return RiotClientImpl.getMatchDetails(props);
  }

  /**
   * Fetch party details, if exists, for a given PUUID.
   *
   * @note - This only works for your own PUUID, not others.
   *
   * @see [valapidocs unofficial documentation](https://valapidocs.techchrism.me/endpoint/party-player)
   *
   */
  async getPartyDetailsByPuuid(props: PuuidAuthRequest) {
    return RiotClientImpl.getPartyDetailsByPuuid(props);
  }
}

// typecheck hack bc ts doesnt support interface methods :(
MockRiotClient satisfies IRiotClient;
