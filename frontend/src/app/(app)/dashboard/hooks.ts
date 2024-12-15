import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useRiotAuthQuery = () =>
  useSuspenseQuery({
    queryKey: ["riot", "auth"],
    queryFn: checkRiotAuth,
  });

async function checkRiotAuth() {
  const res = await fetch("/api/riot/v1/@me");

  const json = (await SJ.parse(await res.text())) as ApiDefault<{
    authToken?: string;
    entitlement?: string;
  }>;

  if (!json.success) {
    return { authToken: undefined, entitlement: undefined };
  }

  const { authToken, entitlement } = json.data;

  return { authToken, entitlement };
}

export default useRiotAuthQuery;
