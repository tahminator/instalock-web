import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";
import { FindRank } from "@w/go/main/App";
import { main } from "@w/go/models";

export const useFindRankQuery = ({ puuid }: { puuid: string }) =>
  useQuery({
    queryKey: ["riot", "live", "player", "rank", puuid],
    queryFn: () => findRank({ puuid }),
  });

const findRank = async ({ puuid }: { puuid: string }) => {
  const res = await FindRank(new main.FindRankPayload({ puuid }));

  if (!res || !res.Ok) {
    return { rank: null, rr: null, rankName: null };
  }

  const json = SJ.parse(res.Text) as ApiDefault<{
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
