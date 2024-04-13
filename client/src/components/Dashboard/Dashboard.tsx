import {
  Box,
  Button,
  Center,
  Code,
  Container,
  Divider,
  Group,
  HoverCard,
  Modal,
  NavLink,
  Space,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandValorant } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import isAuth from '../isAuth/isAuth';
import { Navbar } from '../Navbar/Navbar';
import classes from './Dashboard.module.css';
import AuthModal from '../AuthModal/AuthModal';
import UserNavbar from '../UserNavbar/UserNavbar';

export default function Dashboard({ authenticated, setAuthenticated }) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState('');
  const [entitlementToken, setEntitlementToken] = useState('');
  const [mmr, setMmr] = useState('');
  const [name, setName] = useState('');

  function logOut() {
    setAuthToken('');
    setEntitlementToken('');
    setMmr('');
    setName('');
    notifications.show({
      title: 'Logged out',
      message: 'Your Riot account has been successfully logged out',
      color: 'green',
    });
  }

  useEffect(() => {
    isAuth().then((isAuthenticated) => {
      setAuthenticated(isAuthenticated);
      if (!isAuthenticated) {
        navigate('/login');
      }
    });
  });

  return (
    <>
      <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      {authToken && entitlementToken ? (
        <Text>
          <UserNavbar
            authToken={authToken}
            entitlementToken={entitlementToken}
            mmr={mmr}
            setMmr={setMmr}
            name={name}
            setName={setName}
            logOut={logOut}
          />
        </Text>
      ) : (
        <AuthModal
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          authToken={authToken}
          setAuthToken={setAuthToken}
          entitlementToken={entitlementToken}
          setEntitlementToken={setEntitlementToken}
        />
      )}
    </>
  );
}
