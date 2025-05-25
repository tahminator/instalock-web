import {
  RiotClient,
  RiotCurrentGameApiType,
  RiotPreGameApiType,
} from "@instalock/riot";
import { useQuery } from "@tanstack/react-query";

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
