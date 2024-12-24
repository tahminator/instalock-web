import { RiotPreGameDataType } from "@instalock/types";
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
    queryKey: ["riot", "live", "data", pregameId],
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
  const res = await fetch(
    `https://glz-na-1.na.a.pvp.net/pregame/v1/matches/${pregameId}`,
    {
      headers: {
        Authorization: `Bearer ${riotAuth ?? ""}`,
        "X-Riot-Entitlements-JWT": riotEntitlement ?? "",
        "X-Riot-ClientPlatform":
          "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
        "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
        "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",
      },
    }
  );

  if (!res.ok) {
    return { data: null };
  }

  const riotJson = (await res.json()) as RiotPreGameDataType;

  return { data: riotJson };
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
  const res = await fetch(
    `https://glz-na-1.na.a.pvp.net/pregame/v1/matches/${matchId}/lock/${agentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${riotAuth ?? ""}`,
        "X-Riot-Entitlements-JWT": riotEntitlement ?? "",
        "X-Riot-ClientPlatform":
          "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
        "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
        "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",
      },
    }
  );

  if (!res.ok) {
    return { success: false };
  }

  return { success: true };
};
