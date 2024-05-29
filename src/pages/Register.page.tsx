import { Register } from '@/components/Register/Register';

export function RegisterPage({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Register authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
