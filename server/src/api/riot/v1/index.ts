import { lucia } from "@/lib/auth";
import {
  EntitlementApiType,
  RiotClient,
  RiotMatchInfoType,
  RiotUserInfoType,
} from "@instalock/riot";
import { db } from "@/lib/db";
import {
  getAllMatchesByUserIdShallow,
  getMatchByUuid,
} from "@/lib/db/function/matches";
import {
  createOrUpdatePlayer,
  findPlayerByPuuid,
  markUserAsNoLongerNew,
  removeUserRiotCredentials,
} from "@/lib/db/function/user";
import { loadMatchesForNewUser } from "@/lib/riot/loadMatchesNewUser";
import { sendSuperJson } from "@/lib/superjson-sender";
import { attempt } from "@instalock/attempt";
import {
  getGameModeName,
  TierNumber,
  tierNumberToNameObject,
} from "@instalock/riot";
import {
  authModalSchema,
  checkIdSchema,
  Prisma,
  ShallowMatchExclude,
} from "@instalock/types";
import { Router } from "express";

export const riotRouterV1 = Router();

riotRouterV1.get("/@me", async (req, res) => {
  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const [userError, user] = await attempt(
    findPlayerByPuuid({ puuid: res.locals.user.puuid }),
  );

  if (userError || !user) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "This should not be happening. Check data object.",
        data: { error: userError, user },
      },
    );
  }

  const { riotAuth, riotEntitlement, puuid } = user;

  if (!riotAuth || !riotEntitlement) {
    return sendSuperJson(req, res, 400, {
      success: false,
      message: "Not authenticated.",
    });
  }

  const riotRes = await RiotClient.getUserInfo(riotAuth);

  if (!riotRes.ok) {
    return sendSuperJson(req, res, 400, {
      success: false,
      message: "Not authenticated.",
    });
  }

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Authenticated.",
    payload: { authToken: riotAuth, entitlement: riotEntitlement, puuid },
  });
});

riotRouterV1.post("/auth", async (req, res) => {
  const parser = await authModalSchema.safeParseAsync(req.body);

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

  const { url } = parser.data;

  const authToken = (() => {
    try {
      const urlObject = new URL(url);
      const params = new URLSearchParams(urlObject.hash.substring(1));
      return params.get("access_token");
    } catch {
      return null;
    }
  })();

  if (!authToken) {
    return sendSuperJson(
      req,
      res,
      400,
      {
        success: false,
        message:
          "URL cannot be parsed to find the access_token. If this issue keeps ocurring, please contact tahmidd on Discord.",
      },
      {
        message: "Cannot receive access_token",
        data: { authToken },
      },
    );
  }

  const riotRes = await RiotClient.getEntitlement(authToken);

  const riotJson = await riotRes.json();

  if (riotJson.errorCode !== undefined) {
    return sendSuperJson(
      req,
      res,
      400,
      {
        message: "Failed to authenticate.",
        success: false,
      },
      {
        message: "Riot Api issue.",
        data: riotJson,
      },
    );
  }

  const { entitlements_token: entitlementToken } = riotJson;

  const riotUserInfoRes = await RiotClient.getUserInfo(authToken);

  console.log(await riotUserInfoRes.ok);

  if (!riotUserInfoRes.ok) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to retrieve user info from Riot API.",
        data: { statusCode: riotUserInfoRes.status },
      },
    );
  }

  const riotUserInfoJson = await riotUserInfoRes.json();

  if (riotUserInfoJson.error !== undefined) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to retrieve user info from Riot API.",
        data: { ...riotUserInfoJson },
      },
    );
  }

  const tagName = `${riotUserInfoJson.acct.game_name}#${riotUserInfoJson.acct.tag_line}`;
  const puuid = riotUserInfoJson.sub;

  const [updatedUserError, updatedUser] = await attempt(
    createOrUpdatePlayer({
      puuid,
      riotEntitlement: entitlementToken,
      riotAuth: authToken,
      riotTag: tagName,
    }),
  );

  if (updatedUserError || !updatedUser) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to save Riot credentials to database.",
        data: {
          tokens: { authToken, entitlementToken },
          error: updatedUserError,
        },
      },
    );
  }

  const session = await lucia.createSession(updatedUser.puuid, {});

  res.appendHeader(
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize(),
  );

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Riot authentication succeeded!",
    payload: {
      authToken,
      entitlementToken,
    },
  });
});

riotRouterV1.post("/unauth", async (req, res) => {
  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const [updatedUserError, updatedUser] = await attempt(
    removeUserRiotCredentials({ puuid: res.locals.user.puuid }),
  );

  if (updatedUserError || !updatedUser) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message:
          "Database operation of removing Riot credentials failed. Check data object.",
        data: { error: updatedUserError, user: updatedUser },
      },
    );
  }

  await lucia.invalidateSession(res.locals.session.id);

  res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());

  return sendSuperJson(
    req,
    res,
    200,
    {
      success: true,
      message: "The Riot account has been successfully removed!",
      payload: {},
    },
    {
      message: "Should be successful.",
      data: { updatedUser },
    },
  );
});

riotRouterV1.get("/user", async (req, res) => {
  const result = {
    name: undefined,
    rank: undefined,
    // rr: undefined,
    rankName: undefined,
  } as {
    name?: string;
    rank?: number;
    // rr?: number;
    rankName?: string;
  };

  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const [userError, user] = await attempt(
    findPlayerByPuuid({ puuid: res.locals.user.puuid }),
  );

  if (userError || !user) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "This should not be happening. Check data object.",
        data: { error: userError, user },
      },
    );
  }

  const { riotAuth, riotEntitlement, puuid, riotTag } = user;

  if (!riotAuth || !riotEntitlement || !puuid || !riotTag) {
    return sendSuperJson(req, res, 400, {
      success: false,
      message: "Not authenticated via Riot.",
    });
  }

  result.name = riotTag;

  const matches = await getAllMatchesByUserIdShallow({ puuid });

  if (matches.length !== 0) {
    const me = await db.playerMatch.findUnique({
      where: {
        playerId_matchId: {
          playerId: puuid,
          matchId: matches[matches.length - 1].id,
        },
      },
    });

    result.rank = me?.tier ?? undefined;
  }

  const riotMatchInfoRes = await RiotClient.getCompetitiveUpdates({
    authToken: riotAuth,
    entitlementToken: riotEntitlement,
    puuid,
    startIndex: 0,
    endIndex: 1,
  });

  if (!riotMatchInfoRes.ok) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to retrieve latest match info from Riot API.",
        data: { statusCode: riotMatchInfoRes.status },
      },
    );
  }

  const riotMatchInfoJson = await riotMatchInfoRes.json();

  if (riotMatchInfoJson.errorCode !== undefined) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to retrieve latest match info from Riot API.",
        data: { ...riotMatchInfoJson },
      },
    );
  }

  const latestMatch = riotMatchInfoJson.Matches[0];

  result.rank = latestMatch.TierAfterUpdate;
  // result.rr = latestMatch.RankedRatingAfterUpdate;

  const tierKey = latestMatch.TierAfterUpdate.toString() as TierNumber;
  result.rankName = tierNumberToNameObject[tierKey];

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Player information retrieved!",
    payload: { ...result },
  });
});

riotRouterV1.get("/matches/shallow", async (req, res) => {
  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const { puuid } = res.locals.user;

  const [userError, user] = await attempt(
    findPlayerByPuuid({ puuid: res.locals.user.puuid }),
  );

  if (userError || !user) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "This should not be happening. Check data object.",
        data: { error: userError, user },
      },
    );
  }

  if (user.newUser) {
    // New user fetch matches but wait for the promise to finish to continue, so their dashboard shouldn't be empty.
    await loadMatchesForNewUser(user.puuid);
    await markUserAsNoLongerNew({ puuid: user.puuid });
  }

  // This is asserted to catch any changes so I can update the library accordingly.
  const [matchesError, matches] = await attempt(
    getAllMatchesByUserIdShallow({
      puuid: user.puuid,
    }) as Prisma.PrismaPromise<ShallowMatchExclude[]>,
  );

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

  if (matchesError) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to fetch matches.",
      },
    );
  }

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Matches found!",
    payload: { matches: newMatches },
  });
});

riotRouterV1.get("/match/:id", async (req, res) => {
  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const puuid = res.locals.user.puuid;

  const data = { uuid: (req.params as { id: string }).id };

  const parser = await checkIdSchema.safeParseAsync(data);

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

  const { uuid } = parser.data;

  const [matchError, match] = await attempt(getMatchByUuid({ uuid }));

  if (matchError || !match) {
    return sendSuperJson(
      req,
      res,
      404,
      {
        success: false,
        message: "The match could not be found.",
      },
      {
        message:
          "There can either be a match error or the match simple doesn't exist.",
        data: { error: matchError, match: match },
      },
    );
  }

  const newMatch = await (async () => {
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
  })();

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "The match has been found!",
    payload: { ...newMatch },
  });
});

riotRouterV1.get("/player/:id/name", async (req, res) => {
  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const data = { uuid: (req.params as { id: string }).id };

  const parser = await checkIdSchema.safeParseAsync(data);

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

  const { uuid } = parser.data;

  const [foundUserError, foundUser] = await attempt(
    findPlayerByPuuid({ puuid: uuid }),
  );

  if (foundUser) {
    const { riotTag, puuid } = foundUser;

    return sendSuperJson(req, res, 200, {
      success: true,
      message: "User found!",
      payload: { riotTag, puuid },
    });
  } else {
    const [userError, user] = await attempt(
      findPlayerByPuuid({ puuid: res.locals.user.puuid }),
    );

    if (userError || !user) {
      return sendSuperJson(
        req,
        res,
        500,
        {
          success: false,
          message: "Internal server error.",
        },
        {
          message: "This should not be happening. Check data object.",
          data: { error: userError, user },
        },
      );
    }

    const { riotAuth, riotEntitlement } = user;

    if (!riotAuth || !riotEntitlement) {
      return sendSuperJson(req, res, 400, {
        success: false,
        message: "Not authenticated via Riot.",
      });
    }

    const riotUserInfoRes = await RiotClient.getPlayerByPuuid({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      playerPuuids: [uuid],
    });

    if (!riotUserInfoRes.ok) {
      return sendSuperJson(
        req,
        res,
        404,
        {
          success: false,
          message: "User not found.",
        },
        {
          message: "Failed to retrieve user info from Riot API.",
          data: { statusCode: riotUserInfoRes.status },
        },
      );
    }

    const riotUserInfoJson = await riotUserInfoRes.json();

    const tagName = `${riotUserInfoJson[0].GameName}#${riotUserInfoJson[0].TagLine}`;

    return sendSuperJson(req, res, 200, {
      success: true,
      message: "User found!",
      payload: { riotTag: tagName, puuid: uuid },
    });
  }
});

riotRouterV1.get("/player/:id/rank", async (req, res) => {
  const result = {
    rank: undefined,
    rr: undefined,
    rankName: undefined,
  } as {
    rank?: number;
    rr?: number;
    rankName?: string;
  };

  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const data = { uuid: (req.params as { id: string }).id };

  const [userError, user] = await attempt(
    findPlayerByPuuid({ puuid: res.locals.user.puuid }),
  );

  if (userError || !user) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "This should not be happening. Check data object.",
        data: { error: userError, user },
      },
    );
  }

  const { riotAuth, riotEntitlement, riotTag } = user;

  const { puuid } = { puuid: (req.params as { id: string }).id };

  if (!riotAuth || !riotEntitlement || !puuid || !riotTag) {
    return sendSuperJson(req, res, 400, {
      success: false,
      message: "Not authenticated via Riot.",
    });
  }

  const riotMatchInfoRes = await RiotClient.getCompetitiveUpdates({
    authToken: riotAuth,
    entitlementToken: riotEntitlement,
    puuid,
    startIndex: 0,
    endIndex: 1,
  });

  if (!riotMatchInfoRes.ok) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to retrieve latest match info from Riot API.",
        data: { statusCode: riotMatchInfoRes.status },
      },
    );
  }

  const riotMatchInfoJson = await riotMatchInfoRes.json();

  if (riotMatchInfoJson.errorCode !== undefined) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "Failed to retrieve latest match info from Riot API.",
        data: { ...riotMatchInfoJson },
      },
    );
  }

  const latestMatch =
    riotMatchInfoJson.Matches[riotMatchInfoJson.Matches.length - 1];

  if (latestMatch) {
    result.rank = latestMatch.TierAfterUpdate;
    result.rr = latestMatch.RankedRatingAfterUpdate;

    const tierKey = latestMatch.TierAfterUpdate.toString() as TierNumber;
    result.rankName = tierNumberToNameObject[tierKey];
  } else {
    result.rank = 0;
    result.rr = 0;
    result.rankName = "Unranked";
  }

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Player information retrieved!",
    payload: { ...result },
  });
});
