import { AuthenticationObjectDto, RiotAuthRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

const queryFn = fetcher().api.riot.auth.getMe.fetcher(
  RiotAuthRouteObject.getMe,
);

const useRiotAuthQuery = (autoNavigate = false) => {
  const navigate = useNavigate();

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

export default useRiotAuthQuery;
