import cx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
  Image,
  Loader,
  Center,
  Progress,
  Drawer,
  ScrollArea,
  Button,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash, IconChevronDown, IconRefresh } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import classes from './UserNavbar.module.css';

export default function UserNavbar({
  authToken,
  entitlementToken,
  username,
  setUsername,
  rank,
  setRank,
  rr,
  setRr,
  logOut,
  rankImage,
  setRankImage,
  count,
  setCount,
}: {
  authToken: string;
  entitlementToken: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  rank: string;
  setRank: React.Dispatch<React.SetStateAction<string>>;
  rr: string;
  setRr: React.Dispatch<React.SetStateAction<string>>;
  logOut: () => void;
  rankImage: string;
  setRankImage: React.Dispatch<React.SetStateAction<string>>;
  getImageUrl: (id: string) => string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  matches: Array<any>;
  setMatches: React.Dispatch<React.SetStateAction<never[]>>;
}) {
  // const [] = useDisclosure(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMmr() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/riot/get/mmr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authToken, entitlementToken }),
        });

        if (!response.ok) {
          notifications.show({
            title: 'Failed to fetch MMR',
            message: 'Please try again later',
            color: 'red',
          });
        }

        const data = await response.json();
        if (data.success === 'true') {
          setRank(data.rank);
          setRr(data.rr);
          setUsername(data.name);
          setRankImage(`${data.type}.jpeg`);
        } else {
          notifications.show({
            title: 'Failed to fetch MMR',
            message: 'Please try again later',
            color: 'red',
          });
        }
      } catch (error) {
        notifications.show({
          title: `Failed to fetch MMR: ${error}`,
          message: 'Please try again later',
          color: 'red',
        });
      }
      setIsLoading(false);
    }
    fetchMmr();
  }, [authToken, entitlementToken, count]);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        {isLoading ? (
          <Center h={58}>
            <Loader color="red.7" />
          </Center>
        ) : (
          <Group justify="space-between">
            <Group justify="left" gap={10}>
              <Image src={rankImage} alt={`${rank} ${rr}`} width={40} height={40} />
              <Text>
                {rank} <Progress value={Number(rr)} color="red" /> {rr}/100
              </Text>
            </Group>
            <Group justify="right" gap={10}>
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="xs" size="sm" />
            </Group>
            <Drawer
              opened={drawerOpened}
              onClose={closeDrawer}
              size="80%"
              padding="md"
              title={username}
              hiddenFrom="sm"
              zIndex={1000000}
            >
              <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                <Divider my="sm" />
                <Group justify="center" grow pb="xl" px="md">
                  <Button
                    color="red"
                    leftSection={
                      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    onClick={logOut}
                  >
                    Disconnect from user
                  </Button>
                </Group>
                <Group justify="center" grow pb="xl" px="md">
                  <Button
                    onClick={() => {
                      setCount(count + 1);
                      toggleDrawer();
                    }}
                  >
                    <IconRefresh /> Refresh
                  </Button>
                </Group>
              </ScrollArea>
            </Drawer>
            <Group gap={10}>
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                opened={userMenuOpened}
                onChange={setUserMenuOpened}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Text>{username}</Text>
                      {/* <Avatar src={user.image} alt={user.name} radius="xl" size={20} /> */}
                      {/* <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text> */}
                      <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    onClick={logOut}
                  >
                    Disconnect from user
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <UnstyledButton
                className={cx(classes.user)}
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <Center>
                  <IconRefresh />
                </Center>
              </UnstyledButton>
            </Group>
          </Group>
        )}
      </Container>
    </div>
  );
}
