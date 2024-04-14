import {
  Box,
  Button,
  Center,
  Code,
  Container,
  Divider,
  Grid,
  Group,
  HoverCard,
  LoadingOverlay,
  Modal,
  NavLink,
  ScrollArea,
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
import CardComponent from '../CardComponent/CardComponent';
import Matches from '../Matches/Matches';

export default function Dashboard({ authenticated, setAuthenticated }) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState('');
  const [entitlementToken, setEntitlementToken] = useState('');
  const [rank, setRank] = useState('');
  const [rr, setRr] = useState('');
  const [username, setUsername] = useState('');
  const [rankImage, setRankImage] = useState('');
  const [count, setCount] = useState(0);
  const [matches, setMatches] = useState([]);

  function getImageUrl(name) {
    return new URL(`../../${name}.png`, import.meta.url).href;
  }

  function logOut() {
    setAuthToken('');
    setEntitlementToken('');
    setRank('');
    setRr('');
    setUsername('');
    setRankImage('');
    setCount(0);
    setMatches([]);
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
        <>
          <UserNavbar
            authToken={authToken}
            entitlementToken={entitlementToken}
            rank={rank}
            setRank={setRank}
            rr={rr}
            setRr={setRr}
            username={username}
            setUsername={setUsername}
            logOut={logOut}
            rankImage={rankImage}
            setRankImage={setRankImage}
            getImageUrl={getImageUrl}
            count={count}
            setCount={setCount}
            matches={matches}
            setMatches={setMatches}
          />
          <Matches
            authToken={authToken}
            entitlementToken={entitlementToken}
            count={count}
            matches={matches}
            setMatches={setMatches}
          />
        </>
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
