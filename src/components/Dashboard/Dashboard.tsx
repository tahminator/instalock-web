import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Center, Loader } from '@mantine/core';
import isAuth from '../isAuth/isAuth';
import { Navbar } from '../Navbar/Navbar';
import AuthModal from '../AuthModal/AuthModal';
import UserNavbar from '../UserNavbar/UserNavbar';
import Matches from '../Matches/Matches';

export default function Dashboard({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState('');
  const [entitlementToken, setEntitlementToken] = useState('');
  const [rank, setRank] = useState('');
  const [rr, setRr] = useState('');
  const [username, setUsername] = useState('');
  const [rankImage, setRankImage] = useState('');
  const [count, setCount] = useState(0);
  const [matches, setMatches] = useState([]);
  const [waitingForServer, setWaitingForServer] = useState(true);

  function getImageUrl(name: string) {
    return new URL(`/${name}.png`, import.meta.url).href;
  }

  async function removeEntitlement() {
    const response = await fetch('/api/riot/remove/entitlementsz', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      notifications.show({
        title: 'Failed to remove entitlement',
        message: 'Please try again later',
        color: 'red',
      });
    } else {
      notifications.show({
        title: 'Success',
        message: 'Entitlement has been removed!',
        color: 'green',
      });
    }

    if (!response.ok) {
      return false;
    }

    return true;
  }

  async function logOut() {
    const removed = await removeEntitlement();
    if (!removed) {
      return;
    }
    setAuthToken('');
    setEntitlementToken('');
    setRank('');
    setRr('');
    setUsername('');
    setRankImage('');
    setCount(0);
    setMatches([]);
    setAuthenticated(false);
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
  }, []);

  async function fetchEntitlements() {
    const response = await fetch('/api/riot/get/entitlements', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      notifications.show({
        title: 'Failed to fetch entitlements from server. It likely expired.',
        message: 'Please reauthenticate.',
        color: 'red',
      });
    } else {
      const data = await response.json();
      setEntitlementToken(data.entitlementToken);
      setAuthToken(data.authToken);
    }
    setWaitingForServer(false);
  }

  useEffect(() => {
    fetchEntitlements();
  }, []);

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
            setAuthenticated={setAuthenticated}
          />
        </>
      ) : waitingForServer ? (
        <Center>
          <Loader
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            size="xl"
            color="red"
          />
        </Center>
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
