import { RiotUnauthenticatedRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetProfileByPuuid = (puuid: string) => {
  const queryFn =
    fetcher().api.riot.unauthenticated.getUserMatchesByPuuid.fetcher(
      RiotUnauthenticatedRouteObject.getUserMatchesByPuuid,
    );

  return useQuery({
    queryKey: ["search", puuid],
    queryFn: async () =>
      await queryFn({
        queryParams: undefined,
        pathParams: puuid,
        requestBody: undefined,
      }),
  });
};
