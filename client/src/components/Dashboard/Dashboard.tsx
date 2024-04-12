import { Text } from '@mantine/core';
import { Navbar } from '../Navbar/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import isAuth from '../isAuth/isAuth';

export default function Dashboard({ authenticated, setAuthenticated }) {
  const navigate = useNavigate();
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
    </>
  );
}
