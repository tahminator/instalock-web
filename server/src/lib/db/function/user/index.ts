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
