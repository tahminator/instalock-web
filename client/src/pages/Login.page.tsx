import { Login } from '@/components/Login/Login';

export function LoginPage({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
