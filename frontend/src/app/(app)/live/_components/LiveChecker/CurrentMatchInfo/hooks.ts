import { RiotClient } from "@instalock/riot";
import { useQuery } from "@tanstack/react-query";

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
