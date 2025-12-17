import { RiotClient } from "../../../../../../../../../packages/riot";
import { useMutation, useQuery } from "@tanstack/react-query";

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
