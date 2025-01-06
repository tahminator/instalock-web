import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const useRiotAuthQuery = (autoNavigate = false) => {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["riot", "auth"],
    queryFn: checkRiotAuth,
  });

  const { status, data } = query;

  useEffect(() => {
    // Only do this if opted-in.
    if (autoNavigate) {
      if (status === "error" || !data?.authToken || !data?.entitlement) {
        notifications.show({
          message: "You are not authorized. Please authenticate.",
        });
        navigate("/dashboard");
      }
    }
  }, [autoNavigate, navigate, status, data]);

  return query;
};

async function checkRiotAuth() {
  const res = await fetch("/api/riot/v1/@me");

  const json = (await SJ.parse(await res.text())) as ApiDefault<{
    authToken?: string;
    entitlement?: string;
    puuid?: string;
  }>;

  if (!json.success) {
    return { authToken: undefined, entitlement: undefined, puuid: undefined };
  }

  const { authToken, entitlement, puuid } = json.data;

  return { authToken, entitlement, puuid };
}

export default useRiotAuthQuery;
