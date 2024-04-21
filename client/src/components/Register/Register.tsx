/* eslint-disable no-restricted-globals */
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  rem,
  Center,
  UnstyledButton,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import classes from './Register.module.css';
import isAuth from '../isAuth/isAuth';

export function Register({
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
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

  const handleSignup = async () => {
    setIsSubmitting(true);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    });

    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'You have successfully registered! Please login with your new account.',
        color: 'green',
      });
      navigate('/login');
    } else {
      setIsSubmitting(false);
      notifications.show({
        title: 'Error',
        message: 'Could not login. Please try again later.',
        color: 'red',
      });
    }
  };

  return (
    <Container size={500} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <UnstyledButton>
          <IconHome
            stroke={1.5}
            onClick={() => {
              navigate('/');
            }}
          />
        </UnstyledButton>
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            <Text span variant="gradient" gradient={{ from: 'deep-red.4', to: 'deep-red' }} inherit>
              Instalock
            </Text>
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{' '}
            <Anchor
              size="sm"
              component="button"
              onClick={() => {
                navigate('/login');
              }}
              disabled={isSubmitting}
            >
              Sign in
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit(handleSignup)}>
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
              <Group justify="right" mt="lg">
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
                  onClick={() => history.back()}
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
  );
}
