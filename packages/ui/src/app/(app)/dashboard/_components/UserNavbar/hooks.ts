import { RiotAuthRouteObject, RiotQueryRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";

const useRiotPlayerInfoQuery = () => {
  const queryFn = fetcher().api.riot.query.getMyRiotPlayerData.fetcher(
    RiotQueryRouteObject.getMyRiotPlayerData,
  );

  return useQuery({
    queryKey: ["riot", "player"],
    queryFn: async () =>
      await queryFn({
        queryParams: undefined,
        pathParams: undefined,
        requestBody: undefined,
      }),
  });
};

const useDisconnectRiotPlayerQuery = () => {
  const queryFn = fetcher().api.riot.auth.logout.fetcher(
    RiotAuthRouteObject.logout,
  );

  return useMutation({
    mutationKey: ["riot", "remove"],
    mutationFn: async () =>
      await queryFn({
        queryParams: undefined,
        pathParams: undefined,
        requestBody: undefined,
      }),
  });
};

export { useRiotPlayerInfoQuery, useDisconnectRiotPlayerQuery };
