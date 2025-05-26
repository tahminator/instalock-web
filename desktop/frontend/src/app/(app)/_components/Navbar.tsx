import classes from "@/app/(app)/_components/navbar.module.css";
import NativeLink from "@/components/native-link";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Image,
  rem,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaGlobe } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import LogoImg from "/logo.png";

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box
      style={{
        top: 0,
        background: "#242424",
        backgroundClip: "padding-box",
      }}
      mt={"md"}
    >
      <header
        className={classes.header}
        style={{ cursor: "default", userSelect: "none" }}
      >
        <Group justify="space-between" h="100%">
          <Group pl="10">
            <Image
              src={LogoImg}
              w={30}
              mr={-15}
              ml={-20}
              pt={5}
              alt={"Instalock logo"}
            />
            <Title className={classes.title} order={1}>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: "deep-red.4", to: "deep-red" }}
              >
                Instalock
              </Text>
            </Title>{" "}
          </Group>

          <Group justify="center" h="100%" gap={0} visibleFrom="sm" mr="50">
            <NavLink to="/" className={classes.link}>
              <Text inherit>Home</Text>
            </NavLink>
            {/* <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard> */}
            <NavLink to="/dashboard" className={classes.link}>
              <Text inherit>Dashboard</Text>
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            <NativeLink to={"https://instalock.app"}>
              <Button color={"deep-red"}>
                <FaGlobe className="mr-1" />
                Instalock Web
              </Button>
            </NativeLink>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Group pl="10">
            <Image src={LogoImg} w={30} mr={-15} ml={-20} pt={5} />
            <Title className={classes.title} order={1}>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: "deep-red.4", to: "deep-red" }}
              >
                Instalock
              </Text>
            </Title>{" "}
          </Group>
        }
        hiddenFrom="sm"
        zIndex={400}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <NavLink to="/" className={classes.link}>
            <Text className={classes.link}>Home</Text>
          </NavLink>
          <NavLink to="/dashboard" className={classes.link}>
            <Text className={classes.link}>Dashboard</Text>
          </NavLink>
          {/* <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton> */}
          {/* <Collapse in={linksOpened}>{links}</Collapse> */}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <NativeLink to={"https://instalock.app"}>
              <Button color={"deep-red"} fullWidth>
                <FaGlobe className="mr-1" />
                Instalock Web
              </Button>
            </NativeLink>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
