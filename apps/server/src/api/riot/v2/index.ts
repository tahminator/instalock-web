import { db } from "@/lib/db";
import {
  getAllMatchesByUserIdShallow,
  getMostRecentTierByUserId,
} from "@/lib/db/function/matches";
import { sendSuperJson } from "@/lib/superjson-sender";
import { attempt } from "@instalock/attempt";
import { getGameModeName } from "@instalock/riot";
import { queryByRiotNameSchema } from "@instalock/types";
import { Router } from "express";

/**
 * v2 SHOULD only define unauthenticated routes.
 */
export const riotRouterV2 = Router();

riotRouterV2.get("/user/count", async (req, res) => {
  const registered = await db.user.count({
    where: {
      newUser: false,
    },
  });
  const total = await db.user.count();
  const totalMatches = await db.riotMatch.count();

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Successfully fetched count of all users!",
    payload: {
      total,
      registered,
      totalMatches,
    },
  });
});

riotRouterV2.get("/user/search", async (req, res) => {
  const parser = await queryByRiotNameSchema.safeParseAsync({
    query: req.query["q"],
  });

  if (!parser.success) {
    return sendSuperJson(
      req,
      res,
      400,
      {
        success: false,
        message: "Request body is malformed/improper.",
      },
      {
        message: "Parser failed.",
        error: parser.error,
      },
    );
  }

  const { query } = parser.data;

  const [possibleUsersError, possibleUsers] = await attempt(
    db.user.findMany({
      where: {
        riotTag: {
          contains: query,
          mode: "insensitive",
        },
      },
    }),
  );

  if (possibleUsersError) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to load possible users based on query",
        data: {
          error: possibleUsersError,
        },
      },
    );
  }

  const returnedUsers = possibleUsers.map(({ puuid, riotTag }) => ({
    puuid,
    riotTag,
  }));

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Users fetched!",
    payload: {
      users: returnedUsers,
    },
  });
});

riotRouterV2.get("/user/:puuid", async (req, res) => {
  const { puuid } = req.params;

  const [userError, user] = await attempt(
    db.user.findUnique({
      where: {
        puuid,
      },
    }),
  );

  if (userError) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      {
        message: "Failed to fetch user",
        error: userError,
      },
    );
  }

  if (!user) {
    return sendSuperJson(req, res, 200, {
      success: false,
      message: "User cannot be found.",
    });
  }

  const [matchesError, matches] = await attempt(
    getAllMatchesByUserIdShallow({ puuid }),
  );

  if (matchesError) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      {
        message: "Failed to fetch matches for user",
        error: matchesError,
      },
    );
  }

  if (matches === undefined) {
    return sendSuperJson(req, res, 200, {
      success: false,
      message: "Matches could not be fetched for user.",
    });
  }

  const [tierError, tier] = await attempt(
    getMostRecentTierByUserId({
      puuid,
    }),
  );

  if (tierError || !tier) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      {
        message: "Failed to fetch most recent tier for user",
        error: tierError,
      },
    );
  }

  const newMatches = await Promise.all(
    matches?.map(async (match) => {
      const me = await db.playerMatch.findUnique({
        where: {
          playerId_matchId: {
            playerId: puuid,
            matchId: match.id,
          },
        },
      });

      // await writeFile(
      //   `${__dirname}/test${match.id}.json`,
      //   JSON.stringify(riotPlayersInMatch)
      // );

      const gameModeName = getGameModeName(match.queueId ?? "Unknown");

      return {
        ...match,
        characterId: me?.characterId,
        queueId: gameModeName,
        me,
      };
    }) ?? [],
  );

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "User has been found!",
    payload: {
      puuid: user.puuid,
      riotTag: user.riotTag,
      tier: tier.tier,
      matches: newMatches,
    },
  });
});
