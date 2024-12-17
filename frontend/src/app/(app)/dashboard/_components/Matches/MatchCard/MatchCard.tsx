import { ShallowMatch } from "@instalock/types";
import { mapUuidToNameObject, MapUuid } from "@instalock/types/riot";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";

export default function MatchCard({ match }: { match: ShallowMatch }) {
  const mapName = mapUuidToNameObject[match.mapId as MapUuid];
  const { queueId, isCompleted, characterId } = match;
  const mapSrc = `/maps/${mapName}.png`;
  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
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
            {queueId}
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
            label={characterId}
            color="gray"
            events={{ hover: true, focus: true, touch: true }}
          >
            <Avatar
              // src={mesrc}
              alt={characterId}
              color="red"
              style={{ border: "1px solid gray" }}
            />
          </Tooltip>
        </Group>

        <Space h="xs" />

        {/* <Text size="sm">{description}</Text> */}

        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "blue" }}
          fullWidth
          mt="md"
          radius="md"
          disabled
        >
          View Stats
        </Button>
      </Card>
    </div>
  );
}
