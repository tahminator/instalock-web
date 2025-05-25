import NameSearcher from "@/app/(app)/live/_components/LiveChecker/AgentSelector/NameSearcher/NameSearcher";
import RankSearcher from "@/app/(app)/live/_components/LiveChecker/AgentSelector/RankSearcher/RankSearcher";
import { useCurrentGameQuery } from "@/app/(app)/live/_components/LiveChecker/CurrentMatchInfo/hooks";
import { useAuthUpdater } from "@/app/(app)/live/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";
import {
  AgentUuid,
  agentUuidToNameObject,
  MapUrl,
  mapUrlToUuidObject,
  MapUuid,
  mapUuidToNameObject,
} from "@instalock/riot";
import { Button, Card, Image, Text, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";
// import currentGameData from "./test.json";

export default function CurrentMatchInfo({ matchId }: { matchId: string }) {
  const { riotAuth, riotEntitlement, puuid } = useAuthUpdater();
  const { data: currentGameData, status } = useCurrentGameQuery({
    gameId: matchId,
    riotAuth,
    riotEntitlement,
  });

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error" || !currentGameData.payload) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-[92vh]">
        <Text>
          Sorry, something went wrong when it shouldn't have. If this keeps
          happening, please contact <pre>tahmidd</pre> on Discord
        </Text>
      </div>
    );
  }

  const { MapID: mapUrl, Players: players } = currentGameData.payload;
  //   const { MapID: mapUrl, Players: players } = currentGameData;

  const bluePlayers = players.filter((p) => p.TeamID === "Blue");
  const redPlayers = players.filter((p) => p.TeamID === "Red");

  const mapName = (() => {
    const mapId = mapUrlToUuidObject[mapUrl as MapUrl];
    return mapUuidToNameObject[mapId as MapUuid];
  })();

  return (
    <div className="flex flex-col items-center p-4">
      <Card>
        <div className="flex flex-col space-y-2 items-center">
          <Text className="text-5xl">Live Match</Text>
          <Text className="text-3xl">{mapName}</Text>
          <div className="flex flex-row">
            {bluePlayers.map((player, idx) => {
              const agentName =
                agentUuidToNameObject[player.CharacterID as AgentUuid];
              const agentSrc = `/agents/${agentName}.webp`;

              return (
                <div className="flex flex-col items-center">
                  <NameSearcher
                    puuid={player.Subject}
                    myPuuid={puuid ?? ""}
                    idx={idx}
                    className="md:max-w-none max-w-12 overflow-scroll md:text-base text-xs"
                  />
                  <Tooltip
                    label={`${agentName}`}
                    color="gray"
                    events={{ hover: true, focus: true, touch: true }}
                  >
                    <Image
                      src={agentSrc}
                      alt={agentName}
                      className={
                        "border-4 aspect-square max-w-36 rounded-full border-blue-400"
                      }
                      fallbackSrc="/question-mark.png"
                    />
                  </Tooltip>
                  <RankSearcher puuid={player.Subject} />
                </div>
              );
            })}
          </div>
          <div className="flex flex-row">
            {redPlayers.map((player, idx) => {
              const agentName =
                agentUuidToNameObject[player.CharacterID as AgentUuid];
              const agentSrc = `/agents/${agentName}.webp`;

              return (
                <div className="flex flex-col items-center w-full flex-1">
                  <NameSearcher
                    puuid={player.Subject}
                    myPuuid={puuid ?? ""}
                    idx={idx}
                    className="md:max-w-none max-w-12 overflow-scroll md:text-base text-xs"
                  />
                  <Tooltip
                    label={`${agentName}`}
                    color="gray"
                    events={{ hover: true, focus: true, touch: true }}
                  >
                    <Image
                      src={agentSrc}
                      alt={agentName}
                      className={
                        "border-4 aspect-square max-w-36 rounded-full border-red-400"
                      }
                      fallbackSrc="/question-mark.png"
                    />
                  </Tooltip>
                  <RankSearcher puuid={player.Subject} />
                </div>
              );
            })}
          </div>
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
