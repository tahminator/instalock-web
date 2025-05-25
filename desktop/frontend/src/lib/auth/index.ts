import { SJ } from "@instalock/sj";
import { ApiDefault, Session, User } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";
import { CheckAuthentication } from "@w/go/main/App";

export const useAuthQuery = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthentication,
  });

const checkAuthentication = async () => {
  const res = await CheckAuthentication();

  if (!res.Ok) {
    return { user: undefined, session: undefined };
  }

  const json = SJ.parse(res.Text) as ApiDefault<{
    user: User;
    session: Session;
  }>;

  if (!json.success) {
    return { user: undefined, session: undefined };
  }

  const { user, session } = json.payload;

  return { user, session };
};
