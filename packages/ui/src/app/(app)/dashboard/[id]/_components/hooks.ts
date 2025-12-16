import { RiotQueryRouteObject } from "@instalock/api";
import { fetcher } from "@instalock/fetcher";
import { notifications } from "@mantine/notifications";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useGetMatchInfoQuery = (uuid: string) => {
  const navigate = useNavigate();

  const queryFn = fetcher().api.riot.query.getMatch.fetcher(
    RiotQueryRouteObject.getMatch,
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
