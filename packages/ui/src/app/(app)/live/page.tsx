import Navbar from "@/app/(app)/_components/Navbar";
import LiveChecker from "@/app/(app)/live/_components/LiveChecker/LiveChecker";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { useRiotAuthQuery } from "@/lib/api/queries/api/auth";

export default function LiveMatchPage() {
  // This boolean input is a custom implementation to handle unauthenticated cases.
  // Check implementation for details.
  const { status, data } = useRiotAuthQuery(true);

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (
    status === "error" ||
    !data.user ||
    !data.user.riotAuth ||
    !data.user.riotEntitlement
  ) {
    return <></>;
  }

  return (
    <>
      <Navbar />
      <LiveChecker />
    </>
  );
}
