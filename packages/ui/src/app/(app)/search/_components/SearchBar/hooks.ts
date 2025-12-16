import { RiotUnauthenticatedRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useFetchPossibleUsersByQuery = (q?: string) => {
  const queryFn =
    fetcher().api.riot.unauthenticated.getUsersListsSearchable.fetcher(
      RiotUnauthenticatedRouteObject.getUsersListsSearchable,
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
