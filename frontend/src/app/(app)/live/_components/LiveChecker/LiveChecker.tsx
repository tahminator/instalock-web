import AgentSelector from "@/app/(app)/live/_components/LiveChecker/AgentSelector/AgentSelector";
import { usePreGameCheckQuery } from "@/app/(app)/live/_components/LiveChecker/hooks";
import { useAuthUpdater } from "@/app/(app)/live/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { Button, Loader, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export default function LiveChecker() {
  const { riotAuth, riotEntitlement, puuid } = useAuthUpdater();

  const { data, status } = usePreGameCheckQuery({
    puuid,
    riotAuth,
    riotEntitlement,
  });

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    return;
  }

  const { matchId } = data;

  if (!matchId) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-[92vh]">
        <Loader size={"lg"} color={"red"} />
        <Text className="pt-8 text-center p-4">
          👋 Hey! This screen will automatically update once a new match has
          been detected.
        </Text>
        <Link to="/dashboard">
          <Button className="mt-4" variant="outline" color="red">
            Go back to dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return <AgentSelector matchId={matchId} />;
}
