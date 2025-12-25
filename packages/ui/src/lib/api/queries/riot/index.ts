import { RiotClient } from "@instalock/riot";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGameCheckQuery = ({
  puuid,
  riotAuth,
  riotEntitlement,
}: {
  puuid?: string;
  riotAuth?: string;
  riotEntitlement?: string;
}) => {
  return useQuery({
    queryKey: ["riot", "live", "check"],
    queryFn: () => {
      return checkRiotPreGameStatus({ puuid, riotAuth, riotEntitlement });
    },
    refetchInterval: 800,
  });
};

const checkRiotPreGameStatus = async ({
  puuid,
  riotAuth,
  riotEntitlement,
}: {
  puuid?: string;
  riotAuth?: string;
  riotEntitlement?: string;
}) => {
  if (!puuid || !riotAuth || !riotEntitlement) {
    return { matchId: null };
  }

  const preGameRes = await RiotClient.getPreGameMatchId({
    authToken: riotAuth,
    entitlementToken: riotEntitlement,
    puuid,
  });

  const json = await preGameRes.json();

  if (!preGameRes.ok || json.httpStatus !== undefined) {
    const currentGameRes = await RiotClient.getCurrentGameMatchId({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      puuid,
    });

    const json = await currentGameRes.json();

    if (!currentGameRes.ok || json.httpStatus !== undefined) {
      return { matchId: null, currentMatchId: null };
    }

    return { matchId: null, currentMatchId: json.MatchID };
  }

  return { matchId: json.MatchID, currentMatchId: null };
};

export const usePreGameQuery = ({
  pregameId,
  riotAuth,
  riotEntitlement,
}: {
  pregameId?: string;
  riotAuth?: string;
  riotEntitlement?: string;
}) =>
  useQuery({
    queryKey: ["riot", "live", "pre", "data", pregameId],
    queryFn: () => getPreMatchData({ pregameId, riotAuth, riotEntitlement }),
    refetchInterval: 200,
  });

const getPreMatchData = async ({
  pregameId,
  riotAuth,
  riotEntitlement,
}: {
  pregameId?: string;
  riotAuth?: string;
  riotEntitlement?: string;
}) => {
  if (!riotAuth || !riotEntitlement || !pregameId) {
    return { payload: null };
  }

  const res = await RiotClient.getPreGameMatchDetails({
    authToken: riotAuth,
    entitlementToken: riotEntitlement,
    preMatchId: pregameId,
  });

  if (!res.ok) {
    return { payload: null };
  }

  const riotJson = await res.json();

  return { payload: riotJson };
};

export const usePreGameSelectAgentMutation = ({
  matchId,
}: {
  matchId: string;
}) =>
  useMutation({
    mutationKey: ["riot", "live", "match", matchId],
    mutationFn: selectAgent,
  });

const selectAgent = async ({
  matchId,
  agentId,
  riotAuth,
  riotEntitlement,
}: {
  matchId: string;
  agentId: string;
  riotAuth?: string;
  riotEntitlement?: string;
}) => {
  if (!riotAuth || !riotEntitlement) {
    return { success: false };
  }

  const { success } = await RiotClient.lockAgent({
    authToken: riotAuth,
    entitlementToken: riotEntitlement,
    agentId,
    preMatchId: matchId,
  });

  return { success };
};

export const useCurrentGameQuery = ({
  gameId,
  riotAuth,
  riotEntitlement,
}: {
  gameId?: string;
  riotAuth?: string;
  riotEntitlement?: string;
}) =>
  useQuery({
    queryKey: ["riot", "live", "pre", "data", gameId],
    queryFn: () => getCurrentMatchData({ gameId, riotAuth, riotEntitlement }),
    refetchInterval: 30000,
  });

const getCurrentMatchData = async ({
  gameId,
  riotAuth,
  riotEntitlement,
}: {
  gameId?: string;
  riotAuth?: string;
  riotEntitlement?: string;
}) => {
  if (!riotAuth || !riotEntitlement || !gameId) {
    return { payload: null };
  }

  const res = await RiotClient.getCurrentGameMatchDetails({
    authToken: riotAuth,
    entitlementToken: riotEntitlement,
    currentMatchId: gameId,
  });

  if (!res.ok) {
    return { payload: null };
  }

  const riotJson = await res.json();

  return { payload: riotJson };
};
