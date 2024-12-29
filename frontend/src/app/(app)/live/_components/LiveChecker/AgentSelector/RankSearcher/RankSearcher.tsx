import { useFindRankQuery } from "@/app/(app)/live/_components/LiveChecker/AgentSelector/RankSearcher/hooks";
import { Image } from "@mantine/core";
import clsx from "clsx";

export default function RankSearcher({
  puuid,
  className,
}: {
  puuid: string;
  className?: string;
}) {
  const { data, status } = useFindRankQuery({ puuid });

  if (status !== "success") {
    return <span className={className}>Loading...</span>;
  }

  const rankImage = `/tiers/${data.rank}.png`;

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
