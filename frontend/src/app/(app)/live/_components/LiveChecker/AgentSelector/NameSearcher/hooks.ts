import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

export const useFindNameQuery = ({ puuid }: { puuid: string }) =>
  useQuery({
    queryKey: ["riot", "live", "player", puuid],
    queryFn: () => findName({ puuid }),
  });

const findName = async ({ puuid }: { puuid: string }) => {
  const res = await fetch(`/api/riot/v1/player/${puuid}/name`);

  if (!res.ok) {
    return { name: null };
  }

  const json = SJ.parse(await res.text()) as ApiDefault<{
    riotTag: string;
    puuid: string;
  }>;

  if (!json.success) {
    return { name: null };
  }

  return { name: json.data.riotTag };
};
