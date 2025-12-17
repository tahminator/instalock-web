import { SJ } from "../../../../../../../../../../packages/sj";
import { ApiDefault } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";
import { FindName } from "@w/go/main/App";
import { main } from "@w/go/models";

export const useFindNameQuery = ({ puuid }: { puuid: string }) =>
  useQuery({
    queryKey: ["riot", "live", "player", "name", puuid],
    queryFn: () => findName({ puuid }),
  });

const findName = async ({ puuid }: { puuid: string }) => {
  const res = await FindName(new main.FindNamePayload({ puuid }));

  if (!res || !res.Ok) {
    return { name: null };
  }

  const json = SJ.parse(res.Text) as ApiDefault<{
    riotTag: string;
    puuid: string;
  }>;

  if (!json.success) {
    return { name: null };
  }

  return { name: json.payload.riotTag };
};
