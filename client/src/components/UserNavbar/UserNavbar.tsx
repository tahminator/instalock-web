import cx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './UserNavbar.module.css';
import { notifications } from '@mantine/notifications';

export default function UserNavbar({
  authToken,
  entitlementToken,
  name,
  setName,
  mmr,
  setMmr,
  logOut,
  rankImage,
  setRankImage,
  getImageUrl,
}) {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  useEffect(() => {
    async function fetchMmr() {
      try {
        const response = await fetch('/api/riot/getmmr', {
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
          setMmr(data.rank);
          setName(data.name);
          setRankImage(getImageUrl(data.type));
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
    }
    fetchMmr();
  }, [authToken, entitlementToken]);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Image src={rankImage} alt={`${mmr}`} width={40} height={40} />
          <Text>{mmr}</Text>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Text>{name}</Text>
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
                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                onClick={logOut}
              >
                Disconnect from user
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          {/* <Tabs.List>{items}</Tabs.List> */}
        </Tabs>
      </Container>
    </div>
  );
}
