import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useFetchPossibleUsersByQuery = (q?: string) => {
  const query = useQuery({
    queryKey: ["search", "query", q],
    queryFn: () => {
      return fetcher().api.riot.unauthenticated.getUsersShallow.fetcher({
        queryParams: {
          query: q ?? "",
        },
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
  return useQuery({
    queryKey: ["search", "user", "count"],
    queryFn: () => fetcher().api.riot.unauthenticated.getMetrics.fetcher(),
  });
};

export const useGetProfileByPuuid = (puuid: string) => {
  return useQuery({
    queryKey: ["search", puuid],
    queryFn: () =>
      fetcher().api.riot.unauthenticated.getRiotPlayerDataDetailedByPuuid.fetcher(
        { pathParams: { puuid } },
      ),
  });
};
