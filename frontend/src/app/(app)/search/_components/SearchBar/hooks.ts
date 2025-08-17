import { SJ } from "@instalock/sj";
import { ApiDefault, User } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchPossibleUsersByQuery = (query?: string) => {
  return useQuery({
    queryKey: ["search", "query", query],
    queryFn: async () => {
      const res = await fetch(`/api/riot/v2/user/search?q=${query}`);

      const json = SJ.parse(await res.text()) as ApiDefault<{
        users: Pick<User, "puuid" | "riotTag">[];
      }>;

      if (!json.success) {
        return {
          success: false,
          payload: {
            users: [] as Pick<User, "puuid" | "riotTag">[],
          },
          message: "Failed to fetch users.",
        };
      }

      return {
        success: json.success,
        payload: {
          users: json.payload.users,
        },
        message: json.message,
      };
    },
  });
};
