import { MapUrl, mapUrlToUuidObject, RiotClient } from "@instalock/riot";
import { db } from "../db/index.js";
import { randomUUID } from "crypto";

export const loadMatchesForEachUser = async () => {
  const users = await db.user.findMany();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const matchIds: string[] = [];

    const { riotAuth, riotEntitlement, puuid: riotPuuid, riotTag } = user;

    if (!riotAuth || !riotEntitlement || !riotPuuid || !riotTag) {
      continue;
    }

    const riotRes = await RiotClient.getCompetitiveUpdates({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      puuid: riotPuuid,
      startIndex: 0,
      endIndex: 20,
    });

    if (!riotRes.ok) {
      continue;
    }

    const riotMatchInfoJson = await riotRes.json();

    if (riotMatchInfoJson.errorCode !== undefined) {
      break;
    }

    riotMatchInfoJson.Matches.forEach((match) => {
      matchIds.push(match.MatchID);
    });

    for (let j = 0; j < matchIds.length; j++) {
      const riotMatchRes = await RiotClient.getMatchDetails({
        authToken: riotAuth,
        entitlementToken: riotEntitlement,
        matchId: matchIds[j],
      });

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

      const json = await riotMatchRes.json();

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
              (Number(matchInfo?.gameLengthMillis) || 0),
          ),
          isCompleted: matchInfo?.isCompleted,
          queueId: matchInfo?.queueID,
          isRanked: matchInfo?.isRanked,
          seasonId: matchInfo?.seasonId,
          roundsPlayed: teams && teams[0].roundsPlayed,
          teamWon:
            teams &&
            (teams[0].teamId === "Red" && teams[0].won === true
              ? "Red"
              : "Blue"),
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
              (Number(matchInfo?.gameLengthMillis) || 0),
          ),
          isCompleted: matchInfo?.isCompleted,
          queueId: matchInfo?.queueID,
          isRanked: matchInfo?.isRanked,
          seasonId: matchInfo?.seasonId,
          roundsPlayed: teams && teams[0].roundsPlayed,
          teamWon:
            teams &&
            (teams[0].teamId === "Red" && teams[0].won === true
              ? "Red"
              : "Blue"),
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
  }
};
