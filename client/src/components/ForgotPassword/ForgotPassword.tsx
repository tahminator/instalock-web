/* eslint-disable no-restricted-globals */
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
import classes from './ForgotPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import isAuth from '../isAuth/isAuth';
import { notifications } from '@mantine/notifications';

export function ForgotPassword({ authenticated, setAuthenticated }) {
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) {
          return 'Invalid email';
        }
        if (value.length < 255 && value.length > 6) {
          return null;
        }
        return 'Invalid length of email';
      },
    },
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordRest = async () => {
    setIsSubmitting(true);
    const response = await fetch('/api/auth/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    });

    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'If the email exists, please check your email for more instructions.',
        color: 'green',
      });
      navigate('/login');
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
  return (
    <Container size={500} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Container size={460} my={30}>
          <Title ta="center" className={classes.title}>
            Instalock
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your email to get a reset link
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <form onSubmit={form.onSubmit(handlePasswordRest)}>
              <TextInput
                label="Your email"
                placeholder="stargalaxy687@gmail.com"
                required
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email}
                disabled={isSubmitting}
              />
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
