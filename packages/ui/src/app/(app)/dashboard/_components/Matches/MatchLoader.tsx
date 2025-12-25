import { ReactNode } from "react";

import LiveMatchCard from "@/app/(app)/dashboard/_components/Matches/MatchCard/LiveMatchCard";
import MatchCard from "@/app/(app)/dashboard/_components/Matches/MatchCard/MatchCard";
import SkeletonMatchCardComponent from "@/app/(app)/dashboard/_components/Matches/MatchCard/SkeletonCard/SkeletonCard";
import { useGetShallowMatchesQuery } from "@/lib/api/queries/api/query";

export default function MatchLoader() {
  const { data, status } = useGetShallowMatchesQuery();

  if (status === "pending" || status === "error" || !data.success) {
    return (
      <MatchLoaderWrapper>
        <LiveMatchCard />
        {Array.from({ length: 20 }, (_, k) => (
          <SkeletonMatchCardComponent key={k} />
        ))}
      </MatchLoaderWrapper>
    );
  }

  return (
    <MatchLoaderWrapper>
      <LiveMatchCard />
      {data.payload.map((match, i) => (
        <MatchCard match={match} key={i} />
      ))}
    </MatchLoaderWrapper>
  );
}

function MatchLoaderWrapper({ children }: { children?: ReactNode }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-screen px-8 pt-4">
      {children}
    </div>
  );
}
