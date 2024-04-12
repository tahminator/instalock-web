import { ForgotPassword } from '@/components/ForgotPassword/ForgotPassword';

export function ForgotPage({ authenticated, setAuthenticated }) {
  return (
    <>
      <ForgotPassword authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
