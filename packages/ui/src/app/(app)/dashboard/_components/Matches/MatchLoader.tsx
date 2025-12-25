import { Text } from "@mantine/core";
import { ReactNode } from "react";

import LiveMatchCard from "@/app/(app)/dashboard/_components/Matches/MatchCard/LiveMatchCard";
import MatchCard from "@/app/(app)/dashboard/_components/Matches/MatchCard/MatchCard";
import SkeletonMatchCardComponent from "@/app/(app)/dashboard/_components/Matches/MatchCard/SkeletonCard/SkeletonCard";
import { useGetShallowMatchesQuery } from "@/lib/api/queries/api/query";

export default function MatchLoader() {
  const { data, status } = useGetShallowMatchesQuery();

  if (status === "pending") {
    return (
      <MatchLoaderWrapper>
        {Array.from({ length: 20 }, (_, k) => (
          <SkeletonMatchCardComponent key={k} />
        ))}
      </MatchLoaderWrapper>
    );
  }

  if (status === "error") {
    return (
      <MatchLoaderWrapper>
        <Text>Failed to load previous matches.</Text>
      </MatchLoaderWrapper>
    );
  }

  if (!data.success) {
    return (
      <MatchLoaderWrapper>
        <Text>{data.message}</Text>
      </MatchLoaderWrapper>
    );
  }

  return (
    <MatchLoaderWrapper>
      {data.payload.map((match) => (
        <MatchCard match={match} key={match.matchData.id} />
      ))}
    </MatchLoaderWrapper>
  );
}

function MatchLoaderWrapper({ children }: { children?: ReactNode }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-screen px-8 pt-4">
      <LiveMatchCard />
      {children}
    </div>
  );
}
