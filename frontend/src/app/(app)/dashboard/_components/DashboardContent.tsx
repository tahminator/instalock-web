import MatchIndex from "@/app/(app)/dashboard/_components/Matches/MatchIndex";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { useAuthQuery } from "@/lib/auth";
import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

export default function DashboardContent() {
  const navigate = useNavigate();
  const { status, data } = useAuthQuery();

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    notifications.show({
      message: "Hmm, something went wrong. Please try refreshing the page.",
    });
    return <DashboardContentWrapper />;
  }

  if (!data.user) {
    navigate("/login");
    // Doesn't matter, won't run;
    return <></>;
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
