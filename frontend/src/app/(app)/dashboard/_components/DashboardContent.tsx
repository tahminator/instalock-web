import MatchIndex from "@/app/(app)/dashboard/_components/Matches/MatchIndex";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { useAuthQuery } from "@/lib/auth";
import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";

export default function DashboardContent() {
  const { status } = useAuthQuery();

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    notifications.show({
      message: "Hmm, something went wrong. Please try refreshing the page.",
    });
    return <DashboardContentWrapper />;
  }

  return (
    <DashboardContentWrapper>
      <MatchIndex />
    </DashboardContentWrapper>
  );
}

function DashboardContentWrapper({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
}
