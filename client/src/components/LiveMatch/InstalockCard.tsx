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
  Center,
  Loader,
  Switch,
  rem,
  Grid,
  AspectRatio,
  Overlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import InstalockModal from './InstalockModal';

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
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeZone = new Date()
    .toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' })
    .substring(4)
    .match(/\b(\w)/g)
    .join('');

  return `${dayOfWeek}, ${month} ${day} ${year} - ${hours}:${minutes} ${timeZone}`;
}

export default function InstalockCard({
  authToken,
  entitlementToken,
  width,
  height,
  setAuthenticated,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [pregameStatus, setPregameStatus] = useState(false);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [matchId, setMatchId] = useState('');
  const intervalRef = useRef(null);

  async function checkPregameFunc() {
    try {
      setIsLoadingLive(true);
      const response = await fetch('/api/riot/pregame/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken, entitlementToken }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setPregameStatus(false);
          notifications.show({
            title: 'Authentication expires',
            message: 'Please log in',
            color: 'red',
          });
          setAuthenticated(false);
        } else {
          notifications.show({
            title: 'Failed to check pregame or no pregame found',
            message: 'Please try again later',
            color: 'red',
          });
          setMatchId('');
          setPregameStatus(false);
        }
      } else {
        const data = await response.json();
        if (response.status === 200) {
          setPregameStatus(true);
          notifications.show({
            title: 'Success',
            message: 'Pregame has been found!',
            color: 'green',
          });
          setMatchId(data.matchid);
          open();
        } else if (response.status === 401) {
          setPregameStatus(false);
          notifications.show({
            title: 'Authentication expires',
            message: 'Please log in',
            color: 'red',
          });
          setAuthenticated(false);
        }
      }
    } catch (error) {
      notifications.show({
        title: `Failed to check pregame or no pregame found: ${error}`,
        message: 'Please try again later',
        color: 'red',
      });
      setMatchId('');
      setPregameStatus(false);
    }
    setIsLoadingLive(false);
  }

  useEffect(() => {
    checkPregameFunc();
  }, [authToken, entitlementToken, count]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(checkPregameFunc, 5000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [autoRefresh]);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={width} h={height}>
        <Center h={height}>
          {isLoadingLive ? (
            <Loader color="red.7" />
          ) : pregameStatus ? (
            <>
              <Stack>
                <Text>Match found!</Text>
                <Button
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'blue' }}
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={open}
                >
                  View Match
                </Button>
              </Stack>
            </>
          ) : (
            <Text>No Match Found</Text>
          )}
        </Center>
        <Group gap={7}>
          <Switch
            size="xs"
            checked={autoRefresh}
            onChange={(event) => {
              checkPregameFunc();
              setAutoRefresh(!autoRefresh);
              setChecked(event.target.checked);
            }}
            disabled={isLoadingLive}
            thumbIcon={
              checked ? (
                <IconCheck style={{ width: rem(12), height: rem(12) }} color="blue.6" stroke={3} />
              ) : (
                <IconX style={{ width: rem(12), height: rem(12) }} color="red.6" stroke={3} />
              )
            }
          />
          <Text
            size="xs"
            onClick={() => {
              checkPregameFunc();
              setAutoRefresh(!autoRefresh);
              setChecked(!checked);
            }}
            style={{ cursor: 'default', userSelect: 'none' }}
          >
            Auto Refresh every 5 seconds
          </Text>
        </Group>
      </Card>
      {pregameStatus && matchId ? (
        <InstalockModal
          opened={opened}
          close={close}
          authToken={authToken}
          entitlementToken={entitlementToken}
          matchId={matchId}
        />
      ) : null}
    </>
  );
}
