import { formatGameDuration } from "@/app/(app)/dashboard/[id]/_components/helper";
import { useGetMatchInfoQuery } from "@/app/(app)/dashboard/[id]/_components/hooks";
import PlayerTable from "@/app/(app)/dashboard/[id]/_components/PlayerTable/PlayerTable";
import { MapUuid, mapUuidToNameObject } from "@instalock/types/riot";
import { Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function DetailsLoader({ uuid }: { uuid: string }) {
  const navigate = useNavigate();
  const { data, status } = useGetMatchInfoQuery(uuid);

  if (status === "error") {
    notifications.show({
      message:
        "This is an invalid match page. Please try selecting another match.",
      color: "red",
    });
    navigate("/dashboard");
    return <></>;
  }

  if (!data.data) {
    notifications.show({
      message: "Something went wrong. Please try selecting another match.",
      color: "red",
    });
    navigate("/dashboard");
    return <></>;
  }

  const {
    mapId,
    teamBlueRoundsWon,
    teamRedRoundsWon,
    players,
    gameStart,
    gameEnd,
    me,
  } = data.data;

  const mapName = mapUuidToNameObject[mapId as MapUuid];

  const friendlyPlayers = players
    .filter((p) => p.teamColor === me.teamColor)
    .sort((a, b) => (b.kills ?? 0) - (a.kills ?? 0));
  const enemyPlayers = players
    .filter((p) => p.teamColor !== me.teamColor)
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
            (gameEnd?.getTime() ?? 0) - (gameStart?.getTime() ?? 0)
          )}
        </Text>
      </div>
      <div className="pt-24 flex space-x-2">
        <PlayerTable className="w-1/2 p-4" players={friendlyPlayers} me={me} />
        <PlayerTable className="w-1/2 p-4" players={enemyPlayers} me={me} />
      </div>
      <Link to="/dashboard">
        <Button className="mt-8" variant="outline" color="red">
          Go back to dashboard
        </Button>
      </Link>
    </div>
  );
}
