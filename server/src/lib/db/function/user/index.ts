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
}: {
  id: string;
  authToken: string;
  entitlementToken: string;
}) =>
  db.user.update({
    where: { id },
    data: { riotAuth: authToken, riotEntitlement: entitlementToken },
  });

export const removeUserRiotCredentials = ({ id }: { id: string }) =>
  db.user.update({
    where: { id },
    data: { riotAuth: null, riotEntitlement: null },
  });
