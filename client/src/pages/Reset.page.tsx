import { ResetPassword } from '@/components/ResetPassword/ResetPassword';

export function ResetPage({ authenticated, setAuthenticated }) {
  return (
    <>
      <ResetPassword authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
