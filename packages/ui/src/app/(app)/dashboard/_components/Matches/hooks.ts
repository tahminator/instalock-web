import { RiotQueryRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetShallowMatchesQuery = () => {
  const queryFn = fetcher().api.riot.query.getMyRiotMatchesEnriched.fetcher(
    RiotQueryRouteObject.getMyRiotMatchesEnriched,
  );

  return useQuery({
    queryKey: ["riot", "match", "all"],
    queryFn: async () =>
      await queryFn({
        queryParams: undefined,
        requestBody: undefined,
        pathParams: undefined,
      }),
  });
};
