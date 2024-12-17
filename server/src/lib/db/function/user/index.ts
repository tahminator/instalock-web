import { db } from "@/lib/db";

export const findUserByDiscordId = ({ discordId }: { discordId: string }) =>
  db.user.findUnique({
    where: {
      discordId,
    },
  });

export const createUserWithDiscordIdAndEmail = ({
  discordId,
  discordName,
}: {
  discordId: string;
  discordName: string;
}) =>
  db.user.create({
    data: {
      discordId,
      discordName,
    },
  });

export const findUserById = ({ id }: { id: string }) =>
  db.user.findUnique({
    where: { id },
  });

export const saveUserRiotCredentials = ({
  id,
  authToken,
  entitlementToken,
  puuid,
  tagName,
}: {
  id: string;
  authToken: string;
  entitlementToken: string;
  puuid: string;
  tagName: string;
}) =>
  db.user.update({
    where: { id },
    data: {
      riotAuth: authToken,
      riotEntitlement: entitlementToken,
      riotPuuid: puuid,
      riotTag: tagName,
    },
  });

export const removeUserRiotCredentials = ({ id }: { id: string }) =>
  db.user.update({
    where: { id },
    data: {
      riotAuth: null,
      riotEntitlement: null,
      riotPuuid: null,
      riotTag: null,
    },
  });
