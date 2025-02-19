import {
  RiotCurrentGameApiType,
  RiotPreGameApiType,
} from "@instalock/types/riot";
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

  const preGameRes = await fetch(
    `https://glz-na-1.na.a.pvp.net/pregame/v1/players/${puuid}`,
    {
      headers: {
        Authorization: `Bearer ${riotAuth}`,
        "X-Riot-Entitlements-JWT": riotEntitlement,
        "X-Riot-ClientPlatform":
          "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
        "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
        "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",
      },
    }
  );

  const json = (await preGameRes.json()) as RiotPreGameApiType;

  if (!preGameRes.ok || json.httpStatus !== undefined) {
    const currentGameRes = await fetch(
      `https://glz-na-1.na.a.pvp.net/core-game/v1/players/${puuid}`,
      {
        headers: {
          Authorization: `Bearer ${riotAuth}`,
          "X-Riot-Entitlements-JWT": riotEntitlement,
          "X-Riot-ClientPlatform":
            "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
          "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
          "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",
        },
      }
    );

    const json = (await currentGameRes.json()) as RiotCurrentGameApiType;

    if (!currentGameRes.ok || json.httpStatus !== undefined) {
      return { matchId: null, currentMatchId: null };
    }

    return { matchId: null, currentMatchId: json.MatchID };
  }

  return { matchId: json.MatchID, currentMatchId: null };
};
