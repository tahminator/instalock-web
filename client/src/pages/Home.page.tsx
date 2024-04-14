/* eslint-disable max-len */
import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { ScrollArea } from '@mantine/core';

export function HomePage({ authenticated, setAuthenticated }) {
  return (
    <>
      <ScrollArea style={{ height: '100vh' }}>
        <Welcome authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </ScrollArea>
    </>
  );
}
