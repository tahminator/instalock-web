import { useFindNameQuery } from "@/lib/api/queries/api/query";

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
  const { data: p, status } = useFindNameQuery({ puuid });

  if (puuid === myPuuid) {
    return <span className={className}>Me</span>;
  }

  if (status !== "success" || !p.success || p.payload.riotTag === "") {
    return <span className={className}>#{idx + 1}</span>;
  }

  return <span className={className}>{p.payload.riotTag}</span>;
}
