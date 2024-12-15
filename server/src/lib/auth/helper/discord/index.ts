import { Discord } from "arctic";

if (
  !process.env.DISCORD_CLIENT_ID ||
  !process.env.DISCORD_CLIENT_SECRET ||
  !process.env.DISCORD_REDIRECT_URI
)
  throw new Error("Missing Discord env variables.");

export const discord = new Discord(
  process.env.DISCORD_CLIENT_ID,
  process.env.DISCORD_CLIENT_SECRET,
  process.env.DISCORD_REDIRECT_URI
);
