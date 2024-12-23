import { SJ } from "@instalock/sj";
import { ApiDefault, PlayerMatch, Prisma } from "@instalock/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetMatchInfoQuery = (uuid: string) =>
  useSuspenseQuery({
    queryKey: ["riot", "match", uuid],
    queryFn: () => getRiotMatchInfo(uuid),
  });

export const getRiotMatchInfo = async (uuid: string) => {
  const res = await fetch(`/api/riot/v1/match/${uuid}`);

  if (!res.ok) {
    return { data: null };
  }

  const json = (await SJ.parse(await res.text())) as ApiDefault<
    Prisma.RiotMatchGetPayload<{ include: { players: true } }> & {
      me: PlayerMatch;
    }
  >;

  if (!json.success) {
    return { data: null };
  }

  return { data: json.data };
};
