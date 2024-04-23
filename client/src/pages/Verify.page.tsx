import Verify from '../components/Verify/Verify';

export default function VerifyPage({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Verify authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
