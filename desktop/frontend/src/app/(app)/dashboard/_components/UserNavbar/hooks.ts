import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetPlayerInfo, Unauthenticate } from "@w/go/main/App";

const useRiotPlayerInfoQuery = () =>
  useQuery({
    queryKey: ["riot", "player"],
    queryFn: obtainRiotPlayerInfo,
  });

const obtainRiotPlayerInfo = async () => {
  const res = await GetPlayerInfo();

  if (!res || !res.Ok) {
    return { name: "", rank: 0, rr: 0, rankName: "Unranked" };
  }

  const json = SJ.parse(res.Text) as ApiDefault<{
    name: string;
    rank: number;
    rr: number;
    rankName: string;
  }>;

  if (!json.success) {
    return { name: "", rank: 0, rr: 0, rankName: "Unranked" };
  }

  const { name, rank, rr, rankName } = json.payload;
  return { name, rank, rr, rankName };
};

const useDisconnectRiotPlayerQuery = () =>
  useMutation({
    mutationKey: ["riot", "remove"],
    mutationFn: removeRiotPlayer,
  });

const removeRiotPlayer = async () => {
  const res = await Unauthenticate();

  if (!res || !res.Ok) {
    return { success: false, message: "Something went wrong." };
  }

  const json = SJ.parse(res.Text) as ApiDefault;
  const { success, message } = json;

  return { success, message };
};

export { useRiotPlayerInfoQuery, useDisconnectRiotPlayerQuery };
