import { db } from "@/lib/db";

export const createOrUpdatePlayer = ({
  puuid,
  riotEntitlement,
  riotAuth,
  riotTag,
}: {
  puuid: string;
  riotEntitlement: string;
  riotAuth: string;
  riotTag: string;
}) =>
  db.user.upsert({
    where: { puuid },
    update: {
      riotEntitlement,
      riotAuth,
      riotTag,
    },
    create: {
      puuid,
      riotEntitlement,
      riotAuth,
      riotTag,
    },
  });

export const findPlayerByPuuid = ({ puuid }: { puuid: string }) =>
  db.user.findUnique({
    where: { puuid },
  });

export const removeUserRiotCredentials = ({ puuid }: { puuid: string }) =>
  db.user.update({
    where: { puuid },
    data: {
      riotAuth: null,
      riotEntitlement: null,
    },
  });

export const markUserAsNoLongerNew = ({ puuid }: { puuid: string }) =>
  db.user.update({
    where: { puuid },
    data: {
      newUser: false,
    },
  });
