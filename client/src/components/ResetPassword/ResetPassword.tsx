/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-globals */

// @ts-nocheck

import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import classes from './ResetPassword.module.css';
import checkToken from './checkToken';

export function ResetPassword({ authenticated, setAuthenticated }) {
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get('token');
  const [email, setEmail] = useState('');
  const [validForReset, setValidForReset] = useState({ isValid: false, email: '' });

  const form = useForm({
    initialValues: {
      password: '',
    },
    validate: {
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

  const handlePasswordReset = async () => {
    setIsSubmitting(true);
    const response = await fetch(`/api/auth/changepassword?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    });

    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'Password has been reset! Please login with your new password.',
        color: 'green',
      });
      navigate('/login');
    } else if (response.status === 401) {
      setAuthenticated(false);
    } else if (response.status === 403) {
      setIsSubmitting(false);
      notifications.show({
        title: 'Error',
        message: 'You cannot use the same password. Please try again.',
        color: 'red',
      });
    } else {
      setIsSubmitting(false);
      notifications.show({
        title: 'Error',
        message:
          'Could not reset password. Please try again later or register for an account above.',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    checkToken(token).then(({ isValid, email }) => {
      setValidForReset({ isValid, email });
      setEmail(email);
      if (!isValid) {
        notifications.show({
          title: 'Error',
          message: 'Invalid or expired token. Please try to reset your password again.',
          color: 'red',
        });
        navigate('/');
      }
    });
  }, [isSubmitting]);
  return (
    <Container size={500} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Container size={460} my={30}>
          <Title className={classes.title} ta="center">
            {`Reset password for: ${email}`}
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your password to reset your password
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <form onSubmit={form.onSubmit(handlePasswordReset)} id="resetpassword">
              <TextInput
                label="Your password"
                placeholder="Thisisavalidpassword1@"
                required
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password}
                disabled={isSubmitting}
              />
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
                <Button
                  className={classes.control}
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Reset password
                </Button>
              </Group>
            </form>
          </Paper>
        </Container>
      </Paper>
    </Container>
  );
}
