import { Login } from '@/components/Login/Login';

export function LoginPage({ authenticated, setAuthenticated }) {
  return (
    <>
      <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
