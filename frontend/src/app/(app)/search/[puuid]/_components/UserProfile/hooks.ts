import { SJ } from "@instalock/sj";
import { ApiDefault, ShallowMatch, User } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProfileByPuuid = (puuid: string) => {
  return useQuery({
    queryKey: ["search", puuid],
    queryFn: async () => {
      const res = await fetch(`/api/riot/v2/user/${puuid}`);

      const json = SJ.parse(await res.text()) as ApiDefault<
        Pick<User, "puuid" | "riotTag"> & {
          tier: number;
          matches: ShallowMatch[];
        }
      >;

      return json;
    },
  });
};
