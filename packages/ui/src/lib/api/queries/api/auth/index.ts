import { RiotAuthRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRiotAuthQuery = () => {
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

  return query;
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

export const useAuthenticateMutation = () => {
  const queryClient = useQueryClient();
  const queryFn = fetcher().api.riot.auth.authenticate.fetcher(
    RiotAuthRouteObject.authenticate,
  );

  return useMutation({
    mutationFn: async (data: { url: string }) =>
      await queryFn({
        queryParams: undefined,
        requestBody: data,
        pathParams: undefined,
      }),
    onSuccess: (data) => {
      notifications.show({
        message: data.message,
        color: data.success ? undefined : "red",
      });

      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["riot", "auth"] });
      }
    },
  });
};
