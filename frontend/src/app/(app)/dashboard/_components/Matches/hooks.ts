import { SJ } from "@instalock/sj";
import { ApiDefault, ShallowMatch } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

export const useGetShallowMatchesQuery = () =>
  useQuery({
    queryKey: ["riot", "match", "all"],
    queryFn: getAllShallowMatches,
  });

const getAllShallowMatches = async () => {
  const res = await fetch("/api/riot/v1/matches/shallow");

  const json = SJ.parse(await res.text()) as ApiDefault<{
    matches: (ShallowMatch & { characterId?: string })[];
  }>;

  if (!json.success) {
    return { matches: [] };
  }

  return { matches: json.data.matches };
};
