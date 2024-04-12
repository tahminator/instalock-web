import { Register } from '@/components/Register/Register';

export function RegisterPage({ authenticated, setAuthenticated }) {
  return (
    <>
      <Register authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
