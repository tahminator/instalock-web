import { useFindNameQuery } from "@/app/(app)/live/_components/LiveChecker/AgentSelector/NameSearcher/hooks";

export default function NameSearcher({
  puuid,
  myPuuid,
  idx,
}: {
  puuid: string;
  myPuuid: string;
  idx: number;
}) {
  const { data, status } = useFindNameQuery({ puuid });

  if (puuid === myPuuid) {
    return <div>Me</div>;
  }

  if (status !== "success") {
    return <div>#{idx + 1}</div>;
  }

  return <div>{data.name}</div>;
}
