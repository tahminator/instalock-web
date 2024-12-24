import { db } from "@/lib/db";
import {
  AutoGenMatchMeta,
  MapUrl,
  mapUrlToUuidObject,
  type RiotMatchInfoType,
} from "@instalock/types/riot";
import { randomUUID } from "crypto";

export const loadMatchesForNewUser = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { puuid: userId },
  });

  if (!user) {
    throw new Error("User was not found. This shouldn't be happening.");
  }

  const matchIds: string[] = [];

  const { riotAuth, riotEntitlement, puuid: riotPuuid, riotTag } = user;

  if (!riotAuth || !riotEntitlement || !riotPuuid || !riotTag) {
    throw new Error(
      "User auth info was not found. This shouldn't be happening."
    );
  }

  const riotRes = await fetch(
    `https://pd.na.a.pvp.net/mmr/v1/players/${riotPuuid}/competitiveupdates?startIndex=0&endIndex=20`,
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

  if (!riotRes.ok) {
    throw new Error("User info is not valid. This shouldn't be happening.");
  }

  const riotMatchInfoJson = (await riotRes.json()) as RiotMatchInfoType;

  if (riotMatchInfoJson.errorCode !== undefined) {
    throw new Error("User info is not found. This shouldn't be happening.");
  }

  riotMatchInfoJson.Matches.forEach((match) => {
    matchIds.push(match.MatchID);
  });

  for (let j = 0; j < matchIds.length; j++) {
    const riotMatchRes = await fetch(
      `https://pd.na.a.pvp.net/match-details/v1/matches/${matchIds[j]}`,
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

    // Use the file to generate types, if needed.
    // if (j === 2) {
    // await writeFile(
    //   `${import.meta.dirname}/test.json`,
    //   JSON.stringify(await riotMatchRes.json())
    // );
    // }

    if (!riotMatchRes.ok) {
      continue;
    }

    const json = (await riotMatchRes.json()) as AutoGenMatchMeta;

    const { matchInfo, players, teams } = json;

    const teamBlue =
      teams && teams[0].teamId === "Blue" ? teams[0] : teams && teams[1];
    const teamRed =
      teams && teams[0].teamId === "Red" ? teams[0] : teams && teams[1];

    await db.riotMatch.upsert({
      where: {
        id: matchInfo?.matchId ?? randomUUID(),
      },
      create: {
        id: matchInfo?.matchId ?? randomUUID(),
        raw: json,
        mapId: mapUrlToUuidObject[matchInfo?.mapId as MapUrl],
        gameVersion: matchInfo?.gameVersion,
        gameStart: new Date(matchInfo?.gameStartMillis ?? 0),
        gameEnd: new Date(
          (Number(matchInfo?.gameStartMillis) || 0) +
            (Number(matchInfo?.gameLengthMillis) || 0)
        ),
        isCompleted: matchInfo?.isCompleted,
        queueId: matchInfo?.queueID,
        isRanked: matchInfo?.isRanked,
        seasonId: matchInfo?.seasonId,
        roundsPlayed: teams && teams[0].roundsPlayed,
        teamWon:
          teams &&
          (teams[0].teamId === "Red" && teams[0].won === true ? "Red" : "Blue"),
        teamBlueRoundsWon: teamBlue?.roundsWon,
        teamRedRoundsWon: teamRed?.roundsWon,
        players: {
          create: players?.map((player) => ({
            riotTag: `${player.gameName}#${player.tagLine}`,
            teamId: player.teamId,
            characterId: player.characterId,
            kills: player.stats?.kills ?? 0,
            deaths: player.stats?.deaths ?? 0,
            assists: player.stats?.assists ?? 0,
            tier: player.competitiveTier,
            playerCard: player.playerCard,
            playerTitle: player.playerTitle,
            teamColor: player.teamId === "Blue" ? "Blue" : "Red",
            teamWon:
              teams && teams.find((team) => team.teamId === player.teamId)?.won,
            teamRoundsWon:
              teams &&
              teams.find((team) => team.teamId === player.teamId)?.roundsPlayed,
            player: {
              connectOrCreate: {
                where: { puuid: player.subject ?? randomUUID() },
                create: {
                  puuid: player.subject ?? randomUUID(),
                  riotAuth: null,
                  riotEntitlement: null,
                  riotTag: `${player.gameName}#${player.tagLine}`,
                },
              },
            },
          })),
        },
      },
      update: {
        raw: json,
        mapId: mapUrlToUuidObject[matchInfo?.mapId as MapUrl],
        gameVersion: matchInfo?.gameVersion,
        gameStart: new Date(matchInfo?.gameStartMillis ?? ""),
        gameEnd: new Date(
          (Number(matchInfo?.gameStartMillis) || 0) +
            (Number(matchInfo?.gameLengthMillis) || 0)
        ),
        isCompleted: matchInfo?.isCompleted,
        queueId: matchInfo?.queueID,
        isRanked: matchInfo?.isRanked,
        seasonId: matchInfo?.seasonId,
        roundsPlayed: teams && teams[0].roundsPlayed,
        teamWon:
          teams &&
          (teams[0].teamId === "Red" && teams[0].won === true ? "Red" : "Blue"),
        teamBlueRoundsWon: teamBlue?.roundsWon,
        teamRedRoundsWon: teamRed?.roundsWon,
        players: {
          upsert: players?.map((player) => ({
            where: {
              playerId_matchId: {
                playerId: player.subject ?? randomUUID(),
                matchId: matchInfo?.matchId ?? randomUUID(),
              },
            },
            create: {
              riotTag: `${player.gameName}#${player.tagLine}`,
              teamId: player.teamId,
              characterId: player.characterId,
              kills: player.stats?.kills ?? 0,
              deaths: player.stats?.deaths ?? 0,
              assists: player.stats?.assists ?? 0,
              tier: player.competitiveTier,
              playerCard: player.playerCard,
              playerTitle: player.playerTitle,
              teamColor: player.teamId === "Blue" ? "Blue" : "Red",
              teamWon:
                teams &&
                teams.find((team) => team.teamId === player.teamId)?.won,
              teamRoundsWon:
                teams &&
                teams.find((team) => team.teamId === player.teamId)
                  ?.roundsPlayed,
              player: {
                connectOrCreate: {
                  where: { puuid: player.subject ?? randomUUID() },
                  create: {
                    puuid: player.subject ?? randomUUID(),
                    riotAuth: null,
                    riotEntitlement: null,
                    riotTag: `${player.gameName}#${player.tagLine}`,
                  },
                },
              },
            },
            update: {
              riotTag: `${player.gameName}#${player.tagLine}`,
              teamId: player.teamId,
              characterId: player.characterId,
              kills: player.stats?.kills ?? 0,
              deaths: player.stats?.deaths ?? 0,
              assists: player.stats?.assists ?? 0,
              tier: player.competitiveTier,
              playerCard: player.playerCard,
              playerTitle: player.playerTitle,
              teamColor: player.teamId === "Blue" ? "Blue" : "Red",
              teamWon:
                teams &&
                teams.find((team) => team.teamId === player.teamId)?.won,
              teamRoundsWon:
                teams &&
                teams.find((team) => team.teamId === player.teamId)
                  ?.roundsPlayed,
              player: {
                connectOrCreate: {
                  where: { puuid: player.subject ?? randomUUID() },
                  create: {
                    puuid: player.subject ?? randomUUID(),
                    riotAuth: null,
                    riotEntitlement: null,
                    riotTag: `${player.gameName}#${player.tagLine}`,
                  },
                },
              },
            },
          })),
        },
      },
    });
  }
};
