import { Center, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const HandleVerification = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  token: string | null,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const response = await fetch(`/api/auth/verify?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 200) {
    setIsLoading(false);
    navigate('/login');
    notifications.show({
      title: 'Success',
      message: 'Verification successful, you may login now!',
      color: 'green',
    });
  } else {
    setIsLoading(false);
    navigate('/');
    notifications.show({
      title: 'Failed to verify or verification already completed',
      message: 'Please try again later or try logging in to send another verification email.',
      color: 'red',
    });
  }
};

export default function Verify({
  authenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get('token');

  useEffect(() => {
    HandleVerification(setIsLoading, token, navigate);
  }, []);

  return (
    <>
      {isLoading && authenticated === false ? (
        <Center>
          <Loader></Loader>
        </Center>
      ) : (
        navigate('/')
      )}
    </>
  );
}
