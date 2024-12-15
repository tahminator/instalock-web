import MatchLoader from "@/app/(app)/dashboard/_components/Matches/MatchLoader";
import RiotAuthenticationModal from "@/app/(app)/dashboard/_components/RiotAuth/AuthModal";
import UserNavbar from "@/app/(app)/dashboard/_components/UserNavbar/UserNavbar";
import useRiotAuthQuery from "@/app/(app)/dashboard/hooks";
import { ReactNode, useMemo } from "react";

export default function MatchIndex() {
  const { data } = useRiotAuthQuery();

  const valid = useMemo(() => !!data.authToken && !!data.entitlement, [data]);

  if (!valid) {
    return (
      <MatchIndexWrapper>
        <RiotAuthenticationModal />
      </MatchIndexWrapper>
    );
  }

  return (
    <>
      <UserNavbar />
      <MatchIndexWrapper>
        <MatchLoader />
      </MatchIndexWrapper>
    </>
  );
}

function MatchIndexWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  );
}