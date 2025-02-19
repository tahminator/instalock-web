import AgentSelector from "@/app/(app)/live/_components/LiveChecker/AgentSelector/AgentSelector";
import CurrentMatchInfo from "@/app/(app)/live/_components/LiveChecker/CurrentMatchInfo/CurrentMatchInfo";
import { useGameCheckQuery } from "@/app/(app)/live/_components/LiveChecker/hooks";
import { useAuthUpdater } from "@/app/(app)/live/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { Button, Loader, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export default function LiveChecker() {
  const { riotAuth, riotEntitlement, puuid } = useAuthUpdater();

  const { data, status } = useGameCheckQuery({
    puuid,
    riotAuth,
    riotEntitlement,
  });

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    return <></>;
  }

  const { matchId, currentMatchId } = data;

  if (!matchId && !currentMatchId) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-[92vh]">
        <Loader size={"lg"} color={"red"} />
        <Text className="pt-8 text-center p-4">
          👋 Hey! This screen will automatically update once a match state has
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

  if (!matchId) {
    return <CurrentMatchInfo matchId={currentMatchId!} />;
  }

  return <AgentSelector matchId={matchId} />;
}
