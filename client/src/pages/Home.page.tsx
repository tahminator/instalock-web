/* eslint-disable max-len */
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export function HomePage({ authenticated, setAuthenticated }) {
  return (
    <>
      <Welcome authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
