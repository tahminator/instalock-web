import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchTotalUserCount = () => {
  return useQuery({
    queryKey: ["search", "user", "count"],
    queryFn: async () => {
      const res = await fetch("/api/riot/v2/user/count");

      const json = SJ.parse(await res.text()) as ApiDefault<{
        total: number;
        registered: number;
        totalMatches: number;
      }>;

      return json;
    },
  });
};
