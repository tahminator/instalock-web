import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

export const useFindRankQuery = ({ puuid }: { puuid: string }) =>
  useQuery({
    queryKey: ["riot", "live", "player", "rank", puuid],
    queryFn: () => findRank({ puuid }),
  });

const findRank = async ({ puuid }: { puuid: string }) => {
  const res = await fetch(`/api/riot/v1/player/${puuid}/rank`);
  if (!res.ok) {
    return { rank: null, rr: null, rankName: null };
  }

  const json = SJ.parse(await res.text()) as ApiDefault<{
    rank: number | null;
    rr: number | null;
    rankName: string | null;
  }>;

  if (!json.success) {
    return { rank: null, rr: null, rankName: null };
  }

  const { rank, rr, rankName } = json.payload;
  return { rank, rr, rankName };
};
