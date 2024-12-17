// export default function MatchLoader() {
//   return (
//     <div className="bg-red-300 border border-white p-4 rounded-md text-black text-center">
//       The matches feature is disabled due to the fact that Riot Games released a
//       breaking change. Please check back soon.
//     </div>
//   );
// }

import { useGetShallowMatchesQuery } from "@/app/(app)/dashboard/_components/Matches/hooks";
import MatchCard from "@/app/(app)/dashboard/_components/Matches/MatchCard/MatchCard";
import SkeletonMatchCardComponent from "@/app/(app)/dashboard/_components/Matches/MatchCard/SkeletonCard/SkeletonCard";
import { ReactNode } from "react";

export default function MatchLoader() {
  const { data, status } = useGetShallowMatchesQuery();

  if (status === "error" || status === "pending") {
    return (
      <MatchLoaderWrapper>
        {Array.from({ length: 7 }, () => (
          <SkeletonMatchCardComponent />
        ))}
      </MatchLoaderWrapper>
    );
  }

  return (
    <MatchLoaderWrapper>
      {data.matches.map((match) => (
        <MatchCard match={match} />
      ))}
    </MatchLoaderWrapper>
  );
}

function MatchLoaderWrapper({ children }: { children?: ReactNode }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-screen px-8">
      {children}
    </div>
  );
}
