import { SJ } from "@instalock/sj";
import { ApiDefault, Session, User } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

export const useAuthQuery = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthentication,
  });

const checkAuthentication = async () => {
  const res = await fetch("/api/auth/v1/@me");

  if (!res.ok) {
    return { user: undefined, session: undefined };
  }

  const json = SJ.parse(await res.text()) as ApiDefault<{
    user: User;
    session: Session;
  }>;

  if (!json.success) {
    return { user: undefined, session: undefined };
  }

  const { user, session } = json.data;

  return { user, session };
};
