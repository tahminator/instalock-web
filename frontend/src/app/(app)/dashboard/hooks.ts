import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

const useRiotAuthQuery = () =>
  useQuery({
    queryKey: ["riot", "auth"],
    queryFn: checkRiotAuth,
  });

async function checkRiotAuth() {
  const res = await fetch("/api/riot/v1/@me");

  const json = (await SJ.parse(await res.text())) as ApiDefault<{
    authToken?: string;
    entitlement?: string;
    puuid?: string;
  }>;

  if (!json.success) {
    return { authToken: undefined, entitlement: undefined, puuid: undefined };
  }

  const { authToken, entitlement, puuid } = json.data;

  return { authToken, entitlement, puuid };
}

export default useRiotAuthQuery;
