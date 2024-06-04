/* eslint-disable react/button-has-type */
import {
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Title,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import classes from './Navbar.module.css';
import LogoImg from './logo.png';

// const mockdata = [
//   {
//     icon: IconCode,
//     title: 'Open source',
//     description: 'This Pokémon’s cry is very loud and distracting',
//   },
//   {
//     icon: IconCoin,
//     title: 'Free for everyone',
//     description: 'The fluid of Smeargle’s tail secretions changes',
//   },
//   {
//     icon: IconBook,
//     title: 'Documentation',
//     description: 'Yanma is capable of seeing 360 degrees without',
//   },
//   {
//     icon: IconFingerprint,
//     title: 'Security',
//     description: 'The shell’s rounded shape and the grooves on its.',
//   },
//   {
//     icon: IconChartPie3,
//     title: 'Analytics',
//     description: 'This Pokémon uses its flying ability to quickly chase',
//   },
//   {
//     icon: IconNotification,
//     title: 'Notifications',
//     description: 'Combusken battles with the intensely hot flames it spews',
//   },
// ];

export function Navbar({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' }); // Assuming POST is the correct method

    if (response.ok) {
      notifications.show({
        title: 'Logged Out',
        message: 'You have been logged out.',
        color: 'green',
      });

      setAuthenticated(false);

      // Redirect to home page

      navigate('/');
    } else {
      notifications.show({
        title: 'Error',
        message: 'An error occurred while logging out, please try again later.',
        color: 'red',
      });
    }
  };

  // const links = mockdata.map((item) => (
  //   <UnstyledButton className={classes.subLink} key={item.title}>
  //     <Group wrap="nowrap" align="flex-start">
  //       <ThemeIcon size={34} variant="default" radius="md">
  //         <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
  //       </ThemeIcon>
  //       <div>
  //         <Text size="sm" fw={500}>
  //           {item.title}
  //         </Text>
  //         <Text size="xs" c="dimmed">
  //           {item.description}
  //         </Text>
  //       </div>
  //     </Group>
  //   </UnstyledButton>
  // ));

  const navigate = useNavigate();

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: '#242424',
        backgroundClip: 'padding-box',
      }}
    >
      <header className={classes.header} style={{ cursor: 'default', userSelect: 'none' }}>
        <Group justify="space-between" h="100%">
          <Group pl="10">
            <Image src={LogoImg} w={30} mr={-15} ml={-20} pt={5} />
            <Title className={classes.title} order={1}>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'deep-red.4', to: 'deep-red' }}
              >
                Instalock
              </Text>
            </Title>
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
            {authenticated ? (
              <NavLink to="/dashboard" className={classes.link}>
                <Text inherit>Matches</Text>
              </NavLink>
            ) : (
              <NavLink to="/login" className={classes.link}>
                <Text inherit>Matches</Text>
              </NavLink>
            )}
          </Group>

          <Group visibleFrom="sm">
            {authenticated ? (
              <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'purple' }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            ) : (
              <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'purple' }}
                onClick={() => {
                  navigate('/login');
                }}
              >
                Log In
              </Button>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Instalock"
        hiddenFrom="sm"
        zIndex={0}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <NavLink to="/" className={classes.link}>
            <Text className={classes.link}>Home</Text>
          </NavLink>
          {authenticated ? (
            <NavLink to="/dashboard" className={classes.link}>
              <Text className={classes.link}>Matches</Text>
            </NavLink>
          ) : (
            <NavLink to="/login" className={classes.link}>
              <Text className={classes.link}>Matches</Text>
            </NavLink>
          )}
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
            {!authenticated ? (
              <Button
                variant="gradient"
                gradient={{ from: 'purple', to: 'red' }}
                onClick={() => {
                  navigate('/login');
                }}
              >
                Log in
              </Button>
            ) : (
              <Button
                variant="gradient"
                gradient={{ from: 'purple', to: 'red' }}
                onClick={() => {
                  handleLogout();
                  closeDrawer();
                }}
              >
                Log Out
              </Button>
            )}
            {/* <ColorSchemeToggle /> */}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
