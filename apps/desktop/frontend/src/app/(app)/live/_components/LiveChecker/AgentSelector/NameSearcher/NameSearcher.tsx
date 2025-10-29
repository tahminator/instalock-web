import { useFindNameQuery } from "@/app/(app)/live/_components/LiveChecker/AgentSelector/NameSearcher/hooks";

export default function NameSearcher({
  puuid,
  myPuuid,
  idx,
  className,
}: {
  puuid: string;
  myPuuid: string;
  idx: number;
  className?: string;
}) {
  const { data, status } = useFindNameQuery({ puuid });

  if (puuid === myPuuid) {
    return <span className={className}>Me</span>;
  }

  if (status !== "success" || data.name === "") {
    return <span className={className}>#{idx + 1}</span>;
  }

  return <span className={className}>{data.name}</span>;
}
