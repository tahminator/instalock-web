import {
  Modal,
  Loader,
  Center,
  Title,
  AspectRatio,
  Overlay,
  Stack,
  Avatar,
  Space,
  Box,
  Grid,
  Tooltip,
  Text,
  Image,
  ScrollArea,
  Button,
  Group,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

export default function InstalockModal({
  opened,
  close,
  authToken,
  entitlementToken,
  matchId,
}: {
  opened: boolean;
  close: () => void;
  authToken: string;
  entitlementToken: string;
  matchId: string;
}) {
  const [matchLoading, setMatchLoading] = useState(false);
  const [map, setMap] = useState(51);
  const [mapName, setMapName] = useState('ascent');
  const [selectedAgentPicture, setSelectedAgentPicture] = useState(-1);
  const [selectedAgentName, setSelectedAgentName] = useState('');
  const [selectedAgentID, setSelectedAgentID] = useState('');
  const [, setFormLoading] = useState(false);

  async function getPreMatchData() {
    try {
      setMatchLoading(true);
      const response = await fetch('/api/riot/pregame/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken, entitlementToken, matchId }),
      });

      if (!response.ok) {
        notifications.show({
          title: 'Failed to get pregame data',
          message: 'Please try again later',
          color: 'red',
        });
      }

      const data = await response.json();
      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'Pregame data has been fetched!',
          color: 'green',
        });
        // console.log(data);
        setMap(data.data.mapid);
        setMapName(data.data.mapname);
      } else {
        notifications.show({
          title: 'Failed to get pregame data',
          message: 'Please try again later',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: `Failed to get pregame data: ${error}`,
        message: 'Please try again later',
        color: 'red',
      });
    }
    setMatchLoading(false);
  }

  useEffect(() => {
    getPreMatchData();
  }, [opened]);

  async function selectAgent() {
    try {
      setFormLoading(true);
      const response = await fetch('/api/riot/pregame/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authToken,
          entitlementToken,
          matchId,
          agentId: selectedAgentID,
        }),
      });

      if (!response.ok) {
        notifications.show({
          title: 'Failed to select agent',
          message: 'Please try again later',
          color: 'red',
        });
      }

      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'Agent has been selected!',
          color: 'green',
        });
      } else {
        notifications.show({
          title: 'Failed to select agent',
          message: 'Please try again later',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: `Failed to select agent: ${error}`,
        message: 'Please try again later',
        color: 'red',
      });
    }
  }

  useEffect(() => {
    selectAgent();
  }, [selectedAgentPicture]);

  async function LockAgent() {
    try {
      setFormLoading(true);
      const response = await fetch('/api/riot/pregame/lock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authToken,
          entitlementToken,
          matchId,
          agentId: selectedAgentID,
        }),
      });

      if (!response.ok) {
        notifications.show({
          title: 'Failed to lock agent',
          message: 'Please try again later',
          color: 'red',
        });
      }

      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'Agent has been locked!',
          color: 'green',
        });
      } else {
        notifications.show({
          title: 'Failed to lock agent',
          message: 'Please try again later',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: `Failed to lock agent: ${error}`,
        message: 'Please try again later',
        color: 'red',
      });
    }
  }

  interface Agents {
    [key: string]: { picture: number; name: string };
  }

  const agentPictures: Agents = {
    'e370fa57-4757-3604-3648-499e1f642d3f': { picture: 100, name: 'Gekko' },
    'dade69b4-4f5a-8528-247b-219e5a1facd6': { picture: 101, name: 'Fade' },
    '5f8d3a7f-467b-97f3-062c-13acf203c006': { picture: 102, name: 'Breach' },
    'cc8b64c8-4b25-4ff9-6e7f-37b4da43d235': { picture: 103, name: 'Deadlock' },
    'f94c3b30-42be-e959-889c-5aa313dba261': { picture: 104, name: 'Raze' },
    '22697a3d-45bf-8dd7-4fec-84a9e28c69d7': { picture: 105, name: 'Chamber' },
    '601dbbe7-43ce-be57-2a40-4abd24953621': { picture: 106, name: 'KAY/O' },
    '6f2a04ca-43e0-be17-7f36-b3908627744d': { picture: 107, name: 'Skye' },
    '117ed9e3-49f3-6512-3ccf-0cada7e3823b': { picture: 108, name: 'Cypher' },
    'ded3520f-4264-bfed-162d-b080e2abccf9': { picture: 109, name: 'Sova' },
    '320b2a48-4d9b-a075-30f1-1f93a9b638fa': { picture: 110, name: 'Sova' },
    '1e58de9c-4950-5125-93e9-a0aee9f98746': { picture: 111, name: 'Killjoy' },
    '95b78ed7-4637-86d9-7e41-71ba8c293152': { picture: 112, name: 'Harbor' },
    '707eab51-4836-f488-046a-cda6bf494859': { picture: 113, name: 'Viper' },
    'eb93336a-449b-9c1b-0a54-a891f7921d69': { picture: 114, name: 'Phoenix' },
    '41fb69c1-4189-7b37-f117-bcaf1e96f1bf': { picture: 115, name: 'Astra' },
    '9f0d8ba9-4140-b941-57d3-a7ad57c6b417': { picture: 116, name: 'Brimstone' },
    '0e38b510-41a8-5780-5e8f-568b2a4f2d6c': { picture: 117, name: 'Iso' },
    '1dbf2edd-4729-0984-3115-daa5eed44993': { picture: 118, name: 'Clove' },
    'bb2a4828-46eb-8cd1-e765-15848195d751': { picture: 119, name: 'Neon' },
    '7f94d92c-4234-0a36-9646-3a87eb8b5c89': { picture: 120, name: 'Yoru' },
    '569fdd95-4d10-43ab-ca70-79becc718b46': { picture: 121, name: 'Sage' },
    'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc': { picture: 122, name: 'Reyna' },
    '8e253930-4c05-31dd-1b6c-968525494517': { picture: 123, name: 'Omen' },
    'add6443a-41bd-e414-f6ad-e58d267f4e95': { picture: 124, name: 'Jett' },
  };
  return (
    <div style={{ marginBottom: '10px' }}>
      <Modal
        opened={opened}
        onClose={close}
        title="Live Match"
        centered
        size="sm"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {matchLoading ? (
          <Loader />
        ) : (
          <Center>
            <Title>
              <Center>
                <Text fw={700}>{mapName}</Text>
              </Center>
              <AspectRatio ratio={16 / 9} mah="300">
                <Image
                  src={`${map}.png`}
                  alt="test"
                  radius="md"
                  color="red"
                  style={{ border: '1px solid gray' }}
                />
                <Overlay color="#000" backgroundOpacity={0.35} blur={3}>
                  <Stack>
                    <Text size="xl" fw={700} inherit>
                      {mapName}
                    </Text>
                    <Center>
                      <Avatar
                        src={`${selectedAgentPicture}.png`}
                        color="red"
                        style={{ border: '1px solid gray' }}
                      />
                    </Center>
                    <Center>
                      <Text>{selectedAgentName}</Text>
                    </Center>
                  </Stack>
                </Overlay>
              </AspectRatio>
              <Space h="lg" />
              <Box>
                <Grid justify="center">
                  {Object.keys(agentPictures).map((key) => (
                    <Grid.Col span={2.25} key={key}>
                      <Center>
                        <Tooltip
                          label={agentPictures[key].name}
                          position="top"
                          events={{ hover: true, focus: true, touch: true }}
                        >
                          <Avatar
                            src={`${agentPictures[key].picture}.png`}
                            alt={agentPictures[key].name}
                            radius="xs"
                            size="sm"
                            color="red"
                            style={{ border: '1px dotted gray' }}
                            component="button"
                            bg="black"
                            onClick={() => {
                              setSelectedAgentID(key);
                              setSelectedAgentName(agentPictures[key].name);
                              setSelectedAgentPicture(agentPictures[key].picture);
                            }}
                          />
                        </Tooltip>
                        <Space />
                      </Center>
                    </Grid.Col>
                  ))}
                  <Grid.Col span={12}>
                    <Space h="10" />
                  </Grid.Col>
                  <Group grow>
                    <Button
                      variant="gradient"
                      gradient={{ from: 'purple', to: 'red' }}
                      onClick={() => {
                        LockAgent();
                      }}
                    >
                      Select Agent
                    </Button>
                  </Group>
                  <Grid.Col span={12}>
                    <Space h="10" />
                  </Grid.Col>
                </Grid>
              </Box>
            </Title>
          </Center>
        )}
      </Modal>
    </div>
  );
}
