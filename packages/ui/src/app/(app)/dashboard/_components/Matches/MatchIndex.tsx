import { Text } from "@mantine/core";
import { ReactNode } from "react";

import MatchLoader from "@/app/(app)/dashboard/_components/Matches/MatchLoader";
import RiotAuthenticationModal from "@/app/(app)/dashboard/_components/RiotAuth/AuthModal";
import UserNavbar from "@/app/(app)/dashboard/_components/UserNavbar/UserNavbar";
import useRiotAuthQuery from "@/app/(app)/dashboard/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";

export default function MatchIndex() {
  const { data, status } = useRiotAuthQuery();

  const valid = !!data?.user?.riotAuth && !!data?.user?.riotEntitlement;

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
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
}
