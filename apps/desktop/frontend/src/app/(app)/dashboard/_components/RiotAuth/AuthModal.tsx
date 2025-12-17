import classes from "@/app/(app)/dashboard/_components/RiotAuth/AuthModal.module.css";
import { PasteButton } from "@/app/(app)/dashboard/_components/RiotAuth/_components/PasteButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { SJ } from "../../../../../../../../packages/sj";
import { ApiDefault } from "@instalock/types";
import { authModalSchema } from "@instalock/types/schema/riot-auth-modal";
import {
  Box,
  Button,
  Center,
  Code,
  Container,
  Divider,
  Flex,
  Group,
  HoverCard,
  Modal,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconBrandValorant } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Authenticate } from "@w/go/main/App";
import { main } from "@w/go/models";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { BrowserOpenURL } from "@w/runtime";
import { LocalAuthenticate } from "@w/go/main/App";
import { usePlatformQuery } from "@/app/(app)/dashboard/_components/RiotAuth/hooks";

export default function RiotAuthenticationModal() {
  const queryClient = useQueryClient();
  const { data: platform, status } = usePlatformQuery();

  const [opened, { open, close }] = useDisclosure(false);
  const [highlighted, setHighlighted] = useState(false);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(authModalSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof authModalSchema>) => {
    setLoading(true);
    const id = notifications.show({
      message: "Please wait, attempting to resolve credentials from server...",
    });
    try {
      const res = await Authenticate(new main.AuthenticatePayload(data));

      if (!res || !res.Ok) {
        return notifications.update({
          id,
          message: "Something went wrong, please try again later.",
          color: "red",
        });
      }

      const json = SJ.parse(res.Text) as ApiDefault<{
        authToken: string;
        entitlementToken: string;
      }>;

      if (!json.success) {
        return notifications.update({
          id,
          message: json.message,
          color: "red",
        });
      }

      notifications.update({
        id,
        message: json.message,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["riot", "auth"] });
    } catch {
      return notifications.update({
        id,
        message: "Oops, something went wrong. Please refresh the page.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const onLocalAuthClick = () => {
    async function fetchMe() {
      setLoading(true);
      const id = notifications.show({
        message:
          "Please wait, attempting to resolve credentials from server...",
      });
      try {
        const res = await LocalAuthenticate();

        let json: ApiDefault<{
          authToken: string;
          entitlementToken: string;
        }>;
        try {
          json = SJ.parse(res.Text) as ApiDefault<{
            authToken: string;
            entitlementToken: string;
          }>;
        } catch {
          return notifications.update({
            id,
            message: res.Text,
            color: "red",
          });
        }

        if (!res || !res.Ok) {
          return notifications.update({
            id,
            message: "Something went wrong, please try again later.",
            color: "red",
          });
        }

        if (!json.success) {
          return notifications.update({
            id,
            message: json.message,
            color: "red",
          });
        }

        notifications.update({
          id,
          message: json.message,
          color: "green",
        });
        queryClient.invalidateQueries({ queryKey: ["riot", "auth"] });
      } catch (e) {
        const err = e as Error;
        return notifications.update({
          id,
          message: err.message,
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  };

  return (
    <>
      <Modal
        opened={loading ? true : opened}
        onClose={close}
        title="Riot Authentication"
        centered
        withCloseButton={!loading}
      >
        <Container>
          <Box>
            <Center>
              <Stack>
                <Text size="sm" ta="center">
                  Riot Authentication is required to access this page. Please
                  log in to your Riot account.
                </Text>
                <Divider />
                <HoverCard width={280}>
                  <HoverCard.Target>
                    <Button color="gray">Why?</Button>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">
                      Riot Games has implemented a new authentication system to
                      prevent unauthorized access to their system. This is
                      enforced by HCaptcha, and the only way to bypass this is
                      for a human (aka you) to receive the token. If you have
                      any questions, feel free to comb the{" "}
                      <Link
                        to="https://github.com/0pengu/instalock-web"
                        className="underline"
                      >
                        repo
                      </Link>{" "}
                      on GitHub yourself or email me{" "}
                      <Link to="mailto:tahmid@midhat.io">here</Link>.
                    </Text>
                    <Space h="lg" />
                    <Text size="sm">
                      <strong>Can I get banned?</strong> The answer is no, you
                      should not get banned. The worst case scenario is a 7 day
                      restriction for "API abuse", which they have yet to
                      enforce. The program does not trigger any sort of
                      anti-cheat as it does not modify the game memory or
                      utilize any hacks of any sort.
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
                <Text ta="center" size="sm">
                  Click the button below to authenticate with Riot through the
                  special link. Once you log in, copy the{" "}
                  <Code>https://playvalorant.com</Code> link into the box and
                  click Authenticate.
                </Text>
                <Divider />
                <Button
                  color="red"
                  onClick={() =>
                    BrowserOpenURL(
                      "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid",
                    )
                  }
                  disabled={loading}
                >
                  Open Riot Login Page
                </Button>
              </Stack>
            </Center>
            <Space h="lg" />
            <form
              {...form}
              onSubmit={form.handleSubmit(onSubmit)}
              onBlur={() => setHighlighted(false)}
              onFocus={() => setHighlighted(true)}
            >
              <Controller
                name="url"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    error={!!form.formState.errors.url}
                    label="Valorant Return URL"
                    placeholder="https://playvalorant.com/opt_in#access_token..."
                    required
                    disabled={loading}
                    {...field}
                    // value={form.values.url}
                    // onChange={(event) =>
                    //   form.setFieldValue("url", event.currentTarget.value)
                    // }
                    // error={form.errors.url}
                    // disabled={isSubmitting}
                    rightSection={
                      <PasteButton form={form} highlighted={highlighted} />
                    }
                  />
                )}
              />
              {form.formState.errors.url && (
                <Text c={"red"}>{form.formState.errors.url.message}</Text>
              )}
              <Text size="sm" c="dimmed">
                This data is only used to interact with Riot Games. This URL
                does not give me access to your password, email, or any
                financial information. All the source code is available to
                verify on GitHub by clicking{" "}
                <Link
                  to="https://github.com/0pengu/instalock-web"
                  className="underline"
                >
                  here
                </Link>
                . Please hover over Why? for more information.
              </Text>
              <Flex bg={"dark.5"} m={"xs"} p={"xs"} direction={"column"}>
                <Button
                  disabled={status !== "success" || platform !== "windows"}
                  onClick={onLocalAuthClick}
                  color={"deep-red"}
                >
                  <IconBrandValorant className="mr-2" />
                  Click to authenticate locally
                </Button>
              </Flex>
              <Group
                justify="space-between"
                mt="lg"
                className={classes.controls}
              >
                <Button onClick={close} disabled={loading}>
                  Close
                </Button>
                <Button type="submit" disabled={loading}>
                  Authenticate
                </Button>
              </Group>
            </form>
            <Center></Center>
          </Box>
        </Container>
      </Modal>
      <Center className="flex flex-col items-center justify-center h-[93.5vh]">
        <Button color="red" onClick={open}>
          <IconBrandValorant size={24} />
          <Text pl={5}>Riot Authentication Required</Text>
        </Button>
      </Center>
    </>
  );
}
