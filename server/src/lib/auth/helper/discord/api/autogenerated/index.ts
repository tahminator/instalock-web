type User = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  accent_color: number;
  global_name: string | null;
  avatar_decoration_data: unknown | null;
  banner_color: string;
  clan: string | null;
  primary_guild: string | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  code: 1;
};

type Fail = {
  message: "401: Unathorized";
  code: 0;
};

type DiscordUser = User | Fail;

export default DiscordUser;
