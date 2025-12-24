import { MapUuid, mapUuidToNameObject } from "@instalock/riot";
import { Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { formatGameDuration } from "@/app/(app)/dashboard/[id]/_components/helper";
import { useGetMatchInfoQuery } from "@/app/(app)/dashboard/[id]/_components/hooks";
import PlayerTable from "@/app/(app)/dashboard/[id]/_components/PlayerTable/PlayerTable";

export default function DetailsLoader({ uuid }: { uuid: string }) {
  const { data: result, status } = useGetMatchInfoQuery(uuid);

  // The logic for these situations gets handled inside of the custom hook.
  // Please check the implementation for more details.
  if (status === "error" || !result.success) {
    return <></>;
  }

  const { playerData, matchData, players: p } = result.payload;
  const players = p ?? [];

  const {
    mapId,
    teamBlueRoundsWon,
    teamRedRoundsWon,
    gameStart,
    gameEnd,
    queueId,
  } = matchData;

  const me = playerData;

  const mapName = mapUuidToNameObject[mapId as MapUuid];

  const friendlyPlayers = players
    .filter((p) => p.teamColor === me?.teamColor)
    .sort((a, b) => (b.kills ?? 0) - (a.kills ?? 0));
  const enemyPlayers = players
    .filter((p) => p.teamColor !== me?.teamColor)
    .sort((a, b) => (b.kills ?? 0) - (a.kills ?? 0));

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col space-y-2 items-center">
        <Text className="text-5xl">{mapName}</Text>
        <div className="flex flex-row space-x-2">
          <Text c={"blue"} className="text-3xl">
            {me?.teamColor === "Blue" ? teamBlueRoundsWon : teamRedRoundsWon}
          </Text>
          <Text className="text-3xl">-</Text>
          <Text c="red" className="text-3xl">
            {me?.teamColor === "Blue" ? teamRedRoundsWon : teamBlueRoundsWon}
          </Text>
        </div>
        <Text>
          {formatGameDuration(
            (gameEnd?.getTime() ?? 0) - (gameStart?.getTime() ?? 0),
          )}
        </Text>
      </div>
      <div className="pt-24 flex space-x-2 sm:flex-row flex-col">
        <PlayerTable className="w-1/2 p-4" players={friendlyPlayers} me={me} />
        {queueId !== "Deathmatch" && (
          <PlayerTable className="w-1/2 p-4" players={enemyPlayers} me={me} />
        )}
      </div>
      <Link to="/dashboard">
        <Button className="mt-8" variant="outline" color="red">
          Go back to dashboard
        </Button>
      </Link>
    </div>
  );
}
