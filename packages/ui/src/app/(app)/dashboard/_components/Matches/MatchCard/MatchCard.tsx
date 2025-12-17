import { RiotMatchEnriched } from "@instalock/api";
import {
  mapUuidToNameObject,
  MapUuid,
  agentUuidToNameObject,
  AgentUuid,
} from "@instalock/riot";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { Link } from "react-router-dom";

export default function MatchCard({
  match,
  viewMore = true,
}: {
  match: RiotMatchEnriched;
  viewMore?: boolean;
}) {
  const { gameModeName } = match;
  const { id, isCompleted, mapId, teamBlueRoundsWon, teamRedRoundsWon } =
    match.matchData;
  const me = match.playerData;

  const mapName = mapUuidToNameObject[mapId as MapUuid];
  const mapSrc = `/maps/${mapName}.webp`;

  const agentName = agentUuidToNameObject[me?.characterId as AgentUuid];
  const agentSrc = `/agents/${agentName}.webp`;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder bg={"dark.8"}>
      <Card.Section>
        <Tooltip
          label={mapName}
          color="gray"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Image src={mapSrc} height={160} alt={mapName} />
        </Tooltip>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{mapName}</Text>
        <Text size="xs" c="dimmed">
          {gameModeName}
        </Text>
        <Badge
          variant="gradient"
          size="xs"
          gradient={
            isCompleted
              ? { from: "indigo", to: "blue" }
              : { from: "red", to: "rgba(105, 50, 50, 1)" }
          }
        >
          {isCompleted ? "COMPLETED" : "LIVE"}
        </Badge>
      </Group>

      <Group justify="space-between" align="center" mt="xs" mb="xs">
        {/* <Stack gap="0">
            <Text size="sm" c="dimmed">
              {dayOfWeek}
            </Text>
            <Text size="sm" c="dimmed">{`${month} ${day}, ${year}`}</Text>
            <Text
              size="sm"
              c="dimmed"
            >{`${hours_string}:${minutes} ${amPm} ${timeZone}`}</Text>

            <Text size="sm" c="dimmed">
              {millisToMinutesAndSeconds(duration)}
            </Text>
          </Stack> */}
        <Tooltip
          label={agentName}
          color="gray"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Avatar src={agentSrc} alt={agentName} className="" />
        </Tooltip>
        {gameModeName !== "Deathmatch" && (
          <div className="flex space-x-2">
            <Text c={"blue"}>
              {me?.teamColor === "Blue" ? teamBlueRoundsWon : teamRedRoundsWon}
            </Text>
            <div>-</div>
            <Text c="red">
              {me?.teamColor === "Blue" ? teamRedRoundsWon : teamBlueRoundsWon}
            </Text>
          </div>
        )}
      </Group>
      <Button
        variant="outline"
        color="red"
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        disabled={!viewMore}
        to={viewMore ? `/dashboard/${id}` : "#"}
      >
        View Details
      </Button>
    </Card>
  );
}
