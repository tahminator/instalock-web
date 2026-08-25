import { fetcher } from "@instalock/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useRiotPlayerInfoQuery = () => {
  return useQuery({
    queryKey: ["riot", "player"],
    queryFn: () => fetcher().api.riot.query.getMyRiotPlayerData.fetcher(),
  });
};

export const useGetShallowMatchesQuery = () => {
  return useQuery({
    queryKey: ["riot", "match", "all"],
    queryFn: () => fetcher().api.riot.query.getMyRiotMatchesEnriched.fetcher(),
  });
};

export const useFindNameQuery = ({ puuid }: { puuid: string }) => {
  return useQuery({
    queryKey: ["riot", "live", "player", "data", puuid],
    queryFn: () =>
      fetcher().api.riot.query.getRiotPlayerDataByPuuid.fetcher({
        pathParams: { puuid },
      }),
  });
};

export const useFindRankQuery = useFindNameQuery;

export const useGetMatchInfoQuery = (uuid: string) => {
  const query = useQuery({
    queryKey: ["riot", "match", uuid],
    queryFn: () =>
      fetcher().api.riot.query.getRiotMatchEnrichedByMatchId.fetcher({
        pathParams: { matchId: uuid },
      }),
  });

  return query;
};
