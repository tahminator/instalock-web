import { Text } from "@mantine/core";
import { ReactNode } from "react";

import MatchLoader from "@/app/(app)/dashboard/_components/Matches/MatchLoader";
import RiotAuthenticationModal from "@/app/(app)/dashboard/_components/RiotAuth/AuthModal";
import UserNavbar from "@/app/(app)/dashboard/_components/UserNavbar/UserNavbar";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { useRiotAuthQuery } from "@/lib/api/queries/api/auth";

export default function MatchIndex() {
  const { data, status } = useRiotAuthQuery();

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    return (
      <MatchIndexWrapper>
        <Text>Sorry, something went wrong. Please try again.</Text>
      </MatchIndexWrapper>
    );
  }

  const invalid =
    !data.success ||
    !data.payload.user ||
    !data.payload.session ||
    !data.payload.user.riotAuth ||
    !data.payload.user.riotEntitlement;

  if (invalid) {
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
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
}
