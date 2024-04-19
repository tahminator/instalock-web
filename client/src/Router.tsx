import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';
import { ForgotPage } from './pages/Forgot.page';
import { ResetPage } from './pages/Reset.page';
import { DashboardPage } from './pages/Dashboard.page';

import FourOhFour from './components/FourOhFour/FourOhFour';
import isAuth from './components/isAuth/isAuth';
import { RegisterPage } from './pages/Register.page';

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
          ErrorBoundary: () => <FourOhFour />,
        },
        {
          path: '/login',
          element: <LoginPage authenticated={authenticated} setAuthenticated={setAuthenticated} />,
          ErrorBoundary: () => <FourOhFour />,
        },
        {
          path: '/register',
          element: (
            <RegisterPage authenticated={authenticated} setAuthenticated={setAuthenticated} />
          ),
          ErrorBoundary: () => <FourOhFour />,
        },
        {
          path: '/iforgot',
          element: <ForgotPage authenticated={authenticated} setAuthenticated={setAuthenticated} />,
          ErrorBoundary: () => <FourOhFour />,
        },
        {
          path: '/resetpassword',
          element: <ResetPage authenticated={authenticated} setAuthenticated={setAuthenticated} />,
          ErrorBoundary: () => <FourOhFour />,
        },
        {
          path: '/dashboard',
          element: (
            <DashboardPage authenticated={authenticated} setAuthenticated={setAuthenticated} />
          ),
          ErrorBoundary: () => <FourOhFour />,
        },
      ])}
    />
  );
}
