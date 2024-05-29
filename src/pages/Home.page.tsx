/* eslint-disable max-len */
import { ScrollArea } from '@mantine/core';
import { Welcome } from '@/components/Welcome/Welcome';

export function HomePage({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <ScrollArea style={{ height: '100vh' }}>
        <Welcome authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </ScrollArea>
    </>
  );
}
