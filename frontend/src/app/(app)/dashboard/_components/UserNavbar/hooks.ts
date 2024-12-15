import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const useRiotPlayerInfoQuery = () =>
  useQuery({
    queryKey: ["riot", "player"],
    queryFn: obtainRiotPlayerInfo,
  });

const obtainRiotPlayerInfo = async () => {
  const res = await fetch("/api/riot/v1/user");

  const json = SJ.parse(await res.text()) as ApiDefault<{
    name: string;
    rank: number;
    rr: number;
    rankName: string;
  }>;

  if (!json.success) {
    return { name: "", rank: 0, rr: 0, rankName: "Unranked" };
  }

  const { name, rank, rr, rankName } = json.data;
  return { name, rank, rr, rankName };
};

const useDisconnectRiotPlayerQuery = () =>
  useMutation({
    mutationKey: ["riot", "remove"],
    mutationFn: removeRiotPlayer,
  });

const removeRiotPlayer = async () => {
  const res = await fetch("/api/riot/v1/unauth", {
    method: "POST",
  });

  const json = SJ.parse(await res.text()) as ApiDefault;
  const { success, message } = json;

  return { success, message };
};

export { useRiotPlayerInfoQuery, useDisconnectRiotPlayerQuery };
