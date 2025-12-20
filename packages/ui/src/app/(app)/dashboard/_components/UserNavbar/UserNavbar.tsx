import classes from "@/app/(app)/dashboard/_components/UserNavbar/UserNavbar.module.css";
import {
  useDisconnectRiotPlayerQuery,
  useRiotPlayerInfoQuery,
} from "@/app/(app)/dashboard/_components/UserNavbar/hooks";
import {
  Burger,
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  Group,
  Image,
  Loader,
  Menu,
  rem,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconChevronDown, IconRefresh, IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import cx from "clsx";
import { ReactNode, useEffect, useState } from "react";

export default function UserNavbar() {
  const queryClient = useQueryClient();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [opened, setOpened] = useState(false);

  const { data, status } = useRiotPlayerInfoQuery();
  const { mutate } = useDisconnectRiotPlayerQuery();

  if (status === "pending") {
    return (
      <UserNavbarWrapper>
        <Center h={58}>
          <Loader color="red.7" />
        </Center>
      </UserNavbarWrapper>
    );
  }

  if (status === "error") {
    return <UserNavbarWrapper />;
  }

  if (!data.success) {
    return <UserNavbarWrapper />;
  }

  const { riotTag, rr, rank, rankName } = data.payload;
  const rankImage = `/tiers/${rank}.webp`;

  const handleRefresh = () => {
    queryClient.resetQueries({ queryKey: ["riot"] });
  };

  const handleDisconnect = () => {
    const id = notifications.show({
      message: "Removing current Riot connection, please wait...",
    });
    mutate(void 0, {
      onSuccess: ({ success, message }) => {
        notifications.update({
          id,
          message,
          color: success ? "green" : "red",
        });
        queryClient.resetQueries({ queryKey: ["riot"] });
      },
    });
  };

  return (
    <UserNavbarWrapper opened={drawerOpened}>
      <div className="flex flex-row justify-between">
        <Group>
          <Image
            src={rankImage}
            alt={`${rank} ${rr}`}
            width={10}
            height={10}
            className="h-12"
          />
          <Text>
            {rankName}
            {/* <Progress value={Number(rr)} color="red" /> {rr}/100 */}
          </Text>
        </Group>
        <Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="xs"
            size="sm"
          />
        </Group>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="80%"
          padding="md"
          title={riotTag}
          hiddenFrom="sm"
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
            <Group justify="center" grow pb="xl" px="md">
              <Button
                color="red"
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleDisconnect();
                  toggleDrawer();
                }}
              >
                Disconnect from user
              </Button>
            </Group>
            <Group justify="center" grow pb="xl" px="md">
              <Button
                onClick={() => {
                  handleRefresh();
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
            transitionProps={{ transition: "pop-top-right" }}
            opened={opened}
            onChange={setOpened}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(
                  classes.user,
                  {
                    [classes.userActive]: opened,
                  },
                  "p-3",
                )}
              >
                <Group gap={7}>
                  <Text>{riotTag}</Text>
                  {/* <Avatar src={user.image} alt={user.name} radius="xl" size={20} /> */}
                  {/* <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text> */}
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown className="z-350!">
              <Menu.Item
                color="red"
                onClick={handleDisconnect}
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Disconnect from user
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <UnstyledButton
            className={cx(classes.user, "bg-inherit p-3")}
            onClick={handleRefresh}
          >
            <Center>
              <IconRefresh />
            </Center>
          </UnstyledButton>
        </Group>
      </div>
    </UserNavbarWrapper>
  );
}

function UserNavbarWrapper({
  children,
  opened,
}: {
  children?: ReactNode;
  opened?: boolean;
}) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={
        classes.header +
        ` sticky top-0 transition-all ${
          isSticky ? "top-4 w-5/6 rounded-full shadow-blue-500" : "w-full"
        }
          ${opened ? "z-0" : "z-350"}`
      }
    >
      <Container className={classes.mainSection} size="md">
        {children}
      </Container>
    </div>
  );
}
