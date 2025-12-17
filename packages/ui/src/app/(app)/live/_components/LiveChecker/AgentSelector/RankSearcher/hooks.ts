import { RiotQueryRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useFindRankQuery = ({ puuid }: { puuid: string }) => {
  const queryFn = fetcher().api.riot.query.getRiotPlayerDataByPuuid.fetcher(
    RiotQueryRouteObject.getRiotPlayerDataByPuuid,
  );

  return useQuery({
    queryKey: ["riot", "live", "player", "data", puuid],
    queryFn: async () =>
      queryFn({
        pathParams: puuid,
        queryParams: undefined,
        requestBody: undefined,
      }),
  });
};
