import Countdown from "@/app/(app)/live/_components/LiveChecker/AgentSelector/Countdown";
import {
  usePreGameQuery,
  usePreGameSelectAgentMutation,
} from "@/app/(app)/live/_components/LiveChecker/AgentSelector/hooks";
import { useAuthUpdater } from "@/app/(app)/live/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";
import {
  AgentUuid,
  agentUuidToNameObject,
  MapUrl,
  mapUrlToUuidObject,
  MapUuid,
  mapUuidToNameObject,
} from "@instalock/types/riot";
import { Button, Card, Image, Text, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { Link } from "react-router-dom";
// import fakeData from "./test.json";
import NameSearcher from "@/app/(app)/live/_components/LiveChecker/AgentSelector/NameSearcher/NameSearcher";
import RankSearcher from "@/app/(app)/live/_components/LiveChecker/AgentSelector/RankSearcher/RankSearcher";

const agents = (() => {
  const agentsListList = Object.entries(agentUuidToNameObject);

  return agentsListList.map((agentList) => {
    return { uuid: agentList[0], name: agentList[1] };
  });
})();

export default function AgentSelector({ matchId }: { matchId: string }) {
  const { riotAuth, riotEntitlement, puuid } = useAuthUpdater();
  const {
    data: pregameData,
    status,
    refetch,
  } = usePreGameQuery({
    pregameId: matchId,
    riotAuth,
    riotEntitlement,
  });
  const { mutate } = usePreGameSelectAgentMutation({ matchId });

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error" || !pregameData.data) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-[92vh]">
        <Text>
          Sorry, something went wrong when it shouldn't have. If this keeps
          happening, please contact <pre>tahmidd</pre> on Discord
        </Text>
      </div>
    );
  }

  const {
    MapID: mapUrl,
    PhaseTimeRemainingNS,
    AllyTeam: team,
  } = pregameData.data;

  // const { MapID: mapUrl, PhaseTimeRemainingNS, AllyTeam: team } = fakeData;

  const remainingTime = Math.floor(PhaseTimeRemainingNS / 1000000000);

  const mapName = (() => {
    const mapId = mapUrlToUuidObject[mapUrl as MapUrl];
    return mapUuidToNameObject[mapId as MapUuid];
  })();

  const players = team.Players;

  const selectAgent = (agentId: string) => {
    mutate(
      { matchId, agentId, riotAuth, riotEntitlement },
      {
        onSuccess: (data) => {
          if (data.success) {
            refetch();
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Card>
        <div className="flex flex-col space-y-2 items-center">
          <Text className="text-5xl">Pregame</Text>
          <Text className="text-3xl">{mapName}</Text>
          <Countdown start={remainingTime} />
        </div>
        <div className="flex mt-2 md:space-x-8 space-x-2 justify-center w-full">
          {players.map((player, idx) => {
            const agentName =
              agentUuidToNameObject[player.CharacterID as AgentUuid];
            const agentSrc = `/agents/${agentName}.webp`;

            const avatarColor = (() => {
              if (!player.CharacterSelectionState) {
                return "border-inherit";
              }

              if (player.CharacterSelectionState === "selected") {
                return "border-yellow-500";
              }

              if (player.CharacterSelectionState === "locked") {
                return "border-green-500";
              }

              return "border-inherit";
            })();

            return (
              <div className="flex flex-col items-center">
                <NameSearcher
                  puuid={player.Subject}
                  myPuuid={puuid ?? ""}
                  idx={idx}
                  className="md:max-w-none max-w-12 overflow-scroll md:text-base text-xs"
                />
                <Tooltip
                  label={`${
                    agentName ?? "Undecided"
                  } - ${player.CharacterSelectionState.toLocaleUpperCase()}`}
                  color="gray"
                  events={{ hover: true, focus: true, touch: true }}
                >
                  <Image
                    src={agentSrc}
                    alt={agentName}
                    className={clsx(
                      "border-4 aspect-square max-w-36 rounded-full",
                      avatarColor
                    )}
                    fallbackSrc="/question-mark.png"
                  />
                </Tooltip>
                <RankSearcher puuid={player.Subject} />
              </div>
            );
          })}
        </div>
        <div className="grid mt-4 md:grid-cols-12 grid-cols-4 gap-4 justify-center md:px-24 px-8">
          {agents.map((agent) => {
            const agentSrc = `/agents/${agent.name}.webp`;
            return (
              <button onClick={() => selectAgent(agent.uuid)}>
                <Image
                  src={agentSrc}
                  alt={agent.name}
                  className="border rounded-none items-center"
                />
              </button>
            );
          })}
        </div>
      </Card>
      <Link to="/dashboard">
        <Button className="mt-8" variant="outline" color="red">
          Go back to dashboard
        </Button>
      </Link>
    </div>
  );
}
