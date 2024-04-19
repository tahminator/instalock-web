import { ForgotPassword } from '@/components/ForgotPassword/ForgotPassword';

export function ForgotPage({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <ForgotPassword authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
