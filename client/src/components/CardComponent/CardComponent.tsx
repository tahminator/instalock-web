import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  ScrollArea,
  Title,
  Modal,
  Stack,
  Box,
  Space,
  Avatar,
  Tooltip,
} from '@mantine/core';
import { useDisclosure, useElementSize } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
}

function formatUnixTime(unixTime) {
  const date = new Date(unixTime);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours.toString().padStart(2, '0');

  const timeZone = new Date()
    .toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' })
    .substring(4)
    .match(/\b(\w)/g)
    .join('');

  return { data: { dayOfWeek, month, day, year, hours, minutes, amPm, timeZone } };
}

export default function CardComponent({
  src = 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
  alt,
  title,
  time,
  duration,
  completed,
  gamemode,
  realmapname,
  players,
  me,
  description,
  mesrc,
  meagentname,
  setWidth,
  setHeight,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [count, setCount] = useState(0);

  const { ref, width, height } = useElementSize();

  const blueTeam = players.filter((player) => player.teamid === 'Blue');
  const redTeam = players.filter((player) => player.teamid === 'Red');

  const {
    data: { dayOfWeek, month, day, year, hours, minutes, amPm, timeZone },
  } = formatUnixTime(time);

  useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [width, height, count, ref]);

  return (
    <div ref={ref}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Tooltip
            label={realmapname}
            color="gray"
            events={{ hover: true, focus: true, touch: true }}
          >
            <Image src={src} height={160} alt={alt} />
          </Tooltip>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{title}</Text>
          <Text size="xs" c="dimmed">
            {gamemode}
          </Text>
          <Badge
            variant="gradient"
            size="xs"
            gradient={
              completed
                ? { from: 'indigo', to: 'blue' }
                : { from: 'red', to: 'rgba(105, 50, 50, 1)' }
            }
          >
            {completed ? 'COMPLETED' : 'LIVE'}
          </Badge>
        </Group>

        <Group justify="space-between" align="center" mt="xs" mb="xs">
          <Stack gap="0">
            <Text size="sm" c="dimmed">
              {dayOfWeek}
            </Text>
            <Text size="sm" c="dimmed">{`${month} ${day}, ${year}`}</Text>
            <Text size="sm" c="dimmed">{`${hours}:${minutes} ${amPm} ${timeZone}`}</Text>

            <Text size="sm" c="dimmed">
              {millisToMinutesAndSeconds(duration)}
            </Text>
          </Stack>
          <Tooltip
            label={meagentname}
            color="gray"
            events={{ hover: true, focus: true, touch: true }}
          >
            <Avatar src={mesrc} alt={me.agent} color="red" style={{ border: '1px solid gray' }} />
          </Tooltip>
        </Group>

        <Space h="xs" />

        <Text size="sm">{description}</Text>

        <Modal
          opened={opened}
          onClose={close}
          title={gamemode}
          scrollAreaComponent={ScrollArea.Autosize}
          centered
          size="auto"
        >
          <Title>{`${me.name}'s game on ${realmapname}`}</Title>
          <Stack align="center" justify="space-between">
            <Box>
              <Text size="lg" w={500} c="blue">
                Blue Team
              </Text>
              {blueTeam.map((player) => (
                <Text key={player.puuid} c={player.puuid === me.puuid ? 'orange' : 'blue'}>
                  {player.name} - Kills: {player.kills} Deaths: {player.deaths}
                </Text>
              ))}
            </Box>
            <Box>
              <Text size="lg" w={500} c="red">
                Red Team
              </Text>
              {redTeam.map((player) => (
                <Text key={player.puuid} c={player.puuid === me.puuid ? 'orange' : 'red'}>
                  {player.name} - Kills: {player.kills} Deaths: {player.deaths}
                </Text>
              ))}
            </Box>
          </Stack>
        </Modal>

        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'blue' }}
          fullWidth
          mt="md"
          radius="md"
          onClick={open}
        >
          View Stats
        </Button>
      </Card>
    </div>
  );
}
