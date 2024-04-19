import { ResetPassword } from '@/components/ResetPassword/ResetPassword';

export function ResetPage({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <ResetPassword authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
