import { RiotAuthRouteObject, AuthenticationObjectDto } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

export const useRiotAuthQuery = (autoNavigate = false) => {
  const navigate = useNavigate();

  const queryFn = fetcher().api.riot.auth.getMe.fetcher(
    RiotAuthRouteObject.getMe,
  );

  const query = useQuery({
    queryKey: ["riot", "auth"],
    queryFn: () => {
      return queryFn({
        queryParams: undefined,
        requestBody: undefined,
        pathParams: undefined,
      });
    },
  });

  const { status } = query;

  const data = useMemo<AuthenticationObjectDto>((): AuthenticationObjectDto => {
    if (status === "success" && query.data.success) {
      return query.data.payload;
    }
    return {
      user: null,
      session: null,
    };
  }, [query, status]);

  useEffect(() => {
    // Only do this if opted-in.
    if (autoNavigate) {
      if (
        status === "error" ||
        !data?.user?.riotAuth ||
        !data?.user?.riotEntitlement
      ) {
        notifications.show({
          message: "You are not authorized. Please authenticate.",
        });
        navigate("/dashboard");
      }
    }
  }, [autoNavigate, navigate, status, data]);

  return { ...query, data };
};

export const useDisconnectRiotPlayerMutation = () => {
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
