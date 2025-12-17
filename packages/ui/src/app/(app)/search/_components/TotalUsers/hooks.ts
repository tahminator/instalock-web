import { RiotUnauthenticatedRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useFetchTotalUserCount = () => {
  const queryFn = fetcher().api.riot.unauthenticated.getMetrics.fetcher(
    RiotUnauthenticatedRouteObject.getMetrics,
  );

  return useQuery({
    queryKey: ["search", "user", "count"],
    queryFn: async () =>
      await queryFn({
        queryParams: undefined,
        pathParams: undefined,
        requestBody: undefined,
      }),
  });
};
