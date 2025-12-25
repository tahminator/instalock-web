import { RiotQueryRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { notifications } from "@mantine/notifications";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const queryFn =
    fetcher().api.riot.query.getRiotMatchEnrichedByMatchId.fetcher(
      RiotQueryRouteObject.getRiotMatchEnrichedByMatchId,
    );

  const query = useSuspenseQuery({
    queryKey: ["riot", "match", uuid],
    queryFn: async () =>
      await queryFn({
        queryParams: undefined,
        pathParams: uuid,
        requestBody: undefined,
      }),
  });

  const { status, data: result } = query;

  useEffect(() => {
    if (status === "error") {
      notifications.show({
        message:
          "This is an invalid match page. Please try selecting another match.",
        color: "red",
      });
      navigate("/dashboard");
    }
  }, [navigate, status]);

  useEffect(() => {
    if (!result.success) {
      notifications.show({
        message: "Something went wrong. Please try selecting another match.",
        color: "red",
      });
      navigate("/dashboard");
    }
  }, [result.success, navigate]);

  return query;
};
