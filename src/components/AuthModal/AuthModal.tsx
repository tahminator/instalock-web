import {
  Modal,
  Box,
  Center,
  Container,
  Stack,
  Divider,
  Code,
  Button,
  HoverCard,
  Space,
  TextInput,
  Group,
  Text,
} from '@mantine/core';
import { IconBrandValorant } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import classes from './AuthModal.module.css';
import { PasteButton } from '../PasteButton/PasteButton';

export default function AuthModal({
  setAuthenticated,
  setAuthToken,
  setEntitlementToken,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  entitlementToken: string;
  setEntitlementToken: React.Dispatch<React.SetStateAction<string>>;
}) {
  const form = useForm({
    initialValues: {
      url: '',
    },
    validate: {
      url: (value) => {
        if (!value.startsWith('https://playvalorant.com')) {
          return 'URL must be a valid Valorant URL.';
        }
        return null;
      },
    },
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlighted, setHighlighted] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    const response = await fetch('/api/riot/get/entitlements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    });

    if (response.status === 200) {
      const data = await response.json(); // Extract JSON from the response
      if (data.entitlementToken && data.authToken) {
        setEntitlementToken(data.entitlementToken.trim()); // Set the entitlements token
        setAuthToken(data.authToken.trim()); // Set the auth token
        notifications.show({
          title: 'Success',
          message: 'You have received the authentication token and entitlement token.',
          color: 'green',
        });
      } else {
        notifications.show({
          title: 'Error',
          message: 'Tokens are missing in the response.',
          color: 'orange',
        });
      }
    } else if (response.status === 401) {
      setAuthenticated(false);
    } else {
      notifications.show({
        title: 'Error',
        message: 'Could not receive tokens. Please try again later.',
        color: 'red',
      });
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Riot Authentication" centered>
        <Container>
          <Box>
            <Center>
              <Stack>
                <Text size="sm" ta="center">
                  Riot Authentication is required to access this page. Please log in to your Riot
                  account.
                </Text>
                <Divider />
                <Text ta="center" size="sm">
                  Click the button below to authenticate with Riot through the special link. Once
                  you log in, copy the <Code>https://playvalorant.com</Code> link into the box and
                  click Authenticate.
                </Text>
                <HoverCard width={280}>
                  <HoverCard.Target>
                    <Button color="gray">Why?</Button>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">
                      Riot Games has implemented a new authentication system to prevent unauthorized
                      access to their API. This is done via HCaptcha, and the only way to bypass
                      this is to accept the token directly from Riot Games. If you have any
                      questions, feel free to comb the{' '}
                      <Link to="https://github.com/0pengu/instalock-web">repo</Link> on GitHub
                      yourself or email me <Link to="mailto:midhat.io">here</Link>.
                    </Text>
                    <Space h="lg" />
                    <Text size="sm">
                      <strong>Disclaimer:</strong> This is an open-source project and is not
                      affiliated with Riot Games. Use at your own risk.
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
                <Divider />
                <Button
                  color="red"
                  onClick={() =>
                    window.open(
                      'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid'
                    )
                  }
                >
                  Open Riot Login Page
                </Button>
              </Stack>
            </Center>
            <Space h="lg" />
            <form
              onSubmit={form.onSubmit(handleLogin)}
              onFocus={() => {
                setHighlighted(true);
              }}
              onBlur={() => {
                setHighlighted(false);
              }}
            >
              <TextInput
                label="Valorant Return URL"
                placeholder="https://playvalorant.com/opt_in#access_token..."
                required
                value={form.values.url}
                onChange={(event) => form.setFieldValue('url', event.currentTarget.value)}
                error={form.errors.url}
                disabled={isSubmitting}
                rightSection={<PasteButton form={form} highlighted={highlighted} />}
              />
              <Text size="sm" c="dimmed">
                This data is not stored on the server at all and is only used to interact with Riot
                Games. This URL does not give me access to your password, email, or any financial
                information.
              </Text>
              <Group justify="space-between" mt="lg" className={classes.controls}>
                <Button onClick={close}>Close</Button>
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                  Authenticate
                </Button>
              </Group>
            </form>
            <Center></Center>
          </Box>
        </Container>
      </Modal>
      <Center
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Button color="red" onClick={open}>
          <IconBrandValorant size={24} />
          <Text pl={5}>Riot Authentication Required</Text>
        </Button>
      </Center>
    </>
  );
}
