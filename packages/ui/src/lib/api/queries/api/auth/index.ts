import { fetcher } from "@instalock/fetcher";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRiotAuthQuery = () => {
  const query = useQuery({
    queryKey: ["riot", "auth"],
    queryFn: () => fetcher().api.riot.auth.getMe.fetcher(),
  });

  return query;
};

export const useDisconnectRiotPlayerMutation = () => {
  return useMutation({
    mutationKey: ["riot", "remove"],
    mutationFn: () => fetcher().api.riot.auth.logout.fetcher(),
  });
};

export const useAuthenticateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { url: string }) =>
      fetcher().api.riot.auth.authenticate.fetcher({ requestBody: data }),
    onSuccess: async (data) => {
      notifications.show({
        message: data.message,
        color: data.success ? undefined : "red",
      });

      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: ["riot", "auth"] });
      }
    },
  });
};
