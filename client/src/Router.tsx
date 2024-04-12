import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';
import { ForgotPage } from './pages/Forgot.page';
import { useState, useEffect } from 'react';
import isAuth from './components/isAuth/isAuth';

export function Router() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    isAuth().then(setAuthenticated);
  });

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <HomePage authenticated={authenticated} setAuthenticated={setAuthenticated} />,
        },
        {
          path: '/login',
          element: <LoginPage authenticated={authenticated} setAuthenticated={setAuthenticated} />,
        },
        {
          path: '/iforgot',
          element: <ForgotPage authenticated={authenticated} setAuthenticated={setAuthenticated} />,
        },
      ])}
    />
  );
}
