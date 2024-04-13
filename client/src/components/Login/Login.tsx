/* eslint-disable no-restricted-globals */
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
  Box,
  rem,
  Center,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useTimeout } from '@mantine/hooks';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import classes from './Login.module.css';
import isAuth from '../isAuth/isAuth';

export function Login({ authenticated, setAuthenticated }) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) {
          return 'Invalid email.';
        }
        if (value.length < 255 && value.length > 6) {
          return null;
        }
        return 'Invalid length of email';
      },
      password: (value) => {
        if (/\s/.test(value)) {
          return 'Password must not contain spaces.';
        }
        if (value === value.toLowerCase()) {
          return 'Password must contain at least one uppercase letter.';
        }
        if (value.length < 24 && value.length > 6) {
          return null;
        }
        return 'Invalid length of password.';
      },
    },
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    isAuth().then((isAuthenticated) => {
      setAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        navigate('/dashboard');
      }
    });
  });

  const handleLogin = async () => {
    setIsSubmitting(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    });

    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'You have been logged in!',
        color: 'green',
      });
      navigate('/dashboard');
    } else {
      setIsSubmitting(false);
      notifications.show({
        title: 'Error',
        message: 'Could not login. Please try again later or register for an account above.',
        color: 'red',
      });
    }
  };

  return (
    <>
      {/* <IconHome style={{ width: rem(12), height: rem(12) }} stroke={1.5} /> */}
      <Container size={500} my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
              <Text
                span
                variant="gradient"
                gradient={{ from: 'deep-red.4', to: 'deep-red' }}
                inherit
              >
                Instalock
              </Text>
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Do not have an account yet?{' '}
              <Anchor
                size="sm"
                component="button"
                onClick={() => {
                  navigate('/register');
                }}
                disabled={isSubmitting}
              >
                Create account
              </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <form onSubmit={form.onSubmit(handleLogin)}>
                <TextInput
                  label="Email"
                  placeholder="stargalaxy687@gmail.com"
                  required
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                  error={form.errors.email}
                  disabled={isSubmitting}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Thisisasecurepassword1@"
                  required
                  mt="md"
                  value={form.values.password}
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  error={form.errors.password}
                  disabled={isSubmitting}
                />
                <Group justify="space-between" mt="lg">
                  <Checkbox
                    label="Remember me"
                    checked={form.values.rememberMe}
                    onChange={(event) =>
                      form.setFieldValue('rememberMe', event.currentTarget.checked)
                    }
                    disabled={isSubmitting}
                  />
                  <Anchor
                    size="sm"
                    component="button"
                    type="button"
                    onClick={() => {
                      navigate('/iforgot');
                    }}
                    disabled={isSubmitting}
                  >
                    Forgot password?
                  </Anchor>
                </Group>
                <Group justify="space-between" mt="lg" className={classes.controls}>
                  <Anchor
                    c="dimmed"
                    size="sm"
                    className={classes.control}
                    onClick={() => navigate(-1)}
                  >
                    <Center inline>
                      <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                      <Box ml={5}>Go back</Box>
                    </Center>
                  </Anchor>
                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    Sign In
                  </Button>
                </Group>
              </form>
            </Paper>
          </Container>
        </Paper>
      </Container>
    </>
  );
}
