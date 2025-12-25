import { RiotUnauthenticatedRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useFetchPossibleUsersByQuery = (q?: string) => {
  const queryFn = fetcher().api.riot.unauthenticated.getUsersShallow.fetcher(
    RiotUnauthenticatedRouteObject.getUsersShallow,
  );

  const query = useQuery({
    queryKey: ["search", "query", q],
    queryFn: async () => {
      return await queryFn({
        queryParams: {
          query: q ?? "",
        },
        pathParams: undefined,
        requestBody: undefined,
      });
    },
  });

  const data = useMemo(() => {
    if (query.status !== "success") {
      return [];
    }

    if (!query.data.success) {
      return [];
    }

    return query.data.payload;
  }, [query]);

  return { ...query, data };
};

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

export const useGetProfileByPuuid = (puuid: string) => {
  const queryFn =
    fetcher().api.riot.unauthenticated.getRiotPlayerDataDetailedByPuuid.fetcher(
      RiotUnauthenticatedRouteObject.getRiotPlayerDataDetailedByPuuid,
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
