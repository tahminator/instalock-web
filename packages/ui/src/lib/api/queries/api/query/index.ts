import { RiotQueryRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useRiotPlayerInfoQuery = () => {
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

export const useFindNameQuery = ({ puuid }: { puuid: string }) => {
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

export const useFindRankQuery = useFindNameQuery;

export const useGetMatchInfoQuery = (uuid: string) => {
  const queryFn =
    fetcher().api.riot.query.getRiotMatchEnrichedByMatchId.fetcher(
      RiotQueryRouteObject.getRiotMatchEnrichedByMatchId,
    );

  const query = useQuery({
    queryKey: ["riot", "match", uuid],
    queryFn: async () =>
      await queryFn({
        queryParams: undefined,
        pathParams: uuid,
        requestBody: undefined,
      }),
  });

  return query;
};
