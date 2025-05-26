import { RiotClient } from "@instalock/riot";
import { SJ } from "@instalock/sj";
import { ApiDefault, PlayerMatch, Prisma } from "@instalock/types";
import { notifications } from "@mantine/notifications";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetRiotMatchInfo } from "@w/go/main/App";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useGetMatchInfoQuery = (uuid: string) => {
  const navigate = useNavigate();

  const query = useSuspenseQuery({
    queryKey: ["riot", "match", uuid],
    queryFn: () => getRiotMatchInfo(uuid),
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
    if (!result.data) {
      notifications.show({
        message: "Something went wrong. Please try selecting another match.",
        color: "red",
      });
      navigate("/dashboard");
    }
  }, [result.data, navigate]);

  return query;
};

export const getRiotMatchInfo = async (uuid: string) => {
  const res = await GetRiotMatchInfo(uuid);

  if (!res || !res.Ok) {
    return { data: null };
  }

  const json = (await SJ.parse(res.Text)) as ApiDefault<
    Prisma.RiotMatchGetPayload<{ include: { players: true } }> & {
      me: PlayerMatch;
    }
  >;

  if (!json.success) {
    return { data: null };
  }

  return { data: json.payload };
};
