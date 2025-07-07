import Navbar from "@/app/(app)/_components/Navbar";
import LogoImg from "/logo.png";
import {
  Box,
  Button,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconCircleCheck } from "@tabler/icons-react";
import GithubButton from "@/components/ui/github-button";

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-screen h-[92vh] sm:my-0 my-16">
        <Image
          src={LogoImg}
          w={{ base: 100, sm: 300 }}
          mr={-15}
          ml={-20}
          pt={5}
          alt={"Instalock logo"}
        />
        <Title order={4} maw={"100%"} ta={"center"}>
          Download the beta version of Instalock Desktop now!
        </Title>
        <Text ta={"center"} my={"xs"}>
          Current features
        </Text>
        <List
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>
            One button local authentication (no weird hack required).
          </List.Item>
          <List.Item>Feature parity with instalock.app</List.Item>
          <List.Item>
            Open source just like all the other instalock.app code.
          </List.Item>
        </List>
        <Link to={"https://github.com/tahminator/instalock-web/releases"}>
          <Button
            size="xl"
            visibleFrom="sm"
            variant="gradient"
            gradient={{ from: "purple", to: "red" }}
            className="my-4"
          >
            Download here
          </Button>
          <Button
            size="xl"
            hiddenFrom="sm"
            variant="gradient"
            gradient={{ from: "purple", to: "red" }}
            className="my-4"
          >
            Download here
          </Button>
        </Link>
        <GithubButton to="https://github.com/tahminator/instalock-web/tree/main/desktop" />
        <Box maw={"80%"} my={"lg"}>
          <Text size="sm" c="dimmed" my={"sm"}>
            Instalock Desktop DOES NOT interact with Vanguard in any way.
            Instalock Desktop is a thin wrapper over instalock.app, with the
            ability to read a local file instead of using the regular exploit.
            It still will not modify any sort of game data via memory or
            locally. All requests go to the API on instalock.app. Although no
            guarantees can be made, you should not get banned for having the
            application. What is more likely is API abuse ban, which is only one
            week and to date, has never been handed out for these types of
            applications.
          </Text>
          <Text size="sm" c="dimmed" my={"sm"}>
            From the auth modal of this website: Can I get banned? The answer is
            no, you should not get banned. The worst case scenario is a 7 day
            restriction for "API abuse", which they have yet to enforce. The
            program does not trigger any sort of anti-cheat as it does not
            modify the game memory or utilize any hacks of any sort.
          </Text>
          <Text size="sm" c="dimmed" my={"sm"}>
            This tool could break at any time, as it's purpose is strictly
            educational.
          </Text>
        </Box>
      </div>
    </>
  );
}
