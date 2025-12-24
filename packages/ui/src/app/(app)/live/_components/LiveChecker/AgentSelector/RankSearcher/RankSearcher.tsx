import { Image } from "@mantine/core";
import clsx from "clsx";

import { useFindRankQuery } from "@/app/(app)/live/_components/LiveChecker/AgentSelector/RankSearcher/hooks";

export default function RankSearcher({
  puuid,
  className,
}: {
  puuid: string;
  className?: string;
}) {
  const { data: p, status } = useFindRankQuery({ puuid });

  if (status !== "success" || !p.success || p.payload.riotTag === "") {
    return <span className={className}>Loading...</span>;
  }

  const data = p.payload;

  const rankImage = `/tiers/${data.rank}.webp`;

  return (
    <Image
      src={rankImage}
      alt={`${data.rank} ${data.rr}`}
      width={3}
      height={3}
      className={clsx("aspect-square max-w-12 rounded-full mt-2")}
    />
  );
}
