import { SJ } from "@instalock/sj";
import { ApiDefault, ShallowMatch } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";
import { GetShallowMatches } from "@w/go/main/App";

export const useGetShallowMatchesQuery = () =>
  useQuery({
    queryKey: ["riot", "match", "all"],
    queryFn: getAllShallowMatches,
  });

const getAllShallowMatches = async () => {
  const res = await GetShallowMatches();

  if (!res || !res.Ok) {
    return { matches: [] };
  }

  const json = SJ.parse(res.Text) as ApiDefault<{
    matches: (ShallowMatch & { characterId?: string })[];
  }>;

  if (!json.success) {
    return { matches: [] };
  }

  return { matches: json.payload.matches };
};
