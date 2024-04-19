import { Card, Text, Button, Group, Stack, Center, Loader, Switch, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import InstalockModal from './InstalockModal';

export default function InstalockCard({
  authToken,
  entitlementToken,
  width,
  height,
  setAuthenticated,
}: {
  authToken: string;
  entitlementToken: string;
  width: number;
  height: number;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [pregameStatus, setPregameStatus] = useState(false);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [checked, setChecked] = useState(false);
  const [count] = useState(0);
  const [matchId, setMatchId] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
