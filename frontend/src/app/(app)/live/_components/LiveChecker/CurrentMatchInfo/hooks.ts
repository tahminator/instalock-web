import { RiotCurrentGameDataType } from "@instalock/types";
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
  const res = await fetch(
    `https://glz-na-1.na.a.pvp.net/core-game/v1/matches/${gameId}`,
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

  const riotJson = (await res.json()) as RiotCurrentGameDataType;

  return { data: riotJson };
};
