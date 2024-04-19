import { ScrollArea } from '@mantine/core';
import Dashboard from '@/components/Dashboard/Dashboard';

export function DashboardPage({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <ScrollArea style={{ height: '100vh' }}>
        <Dashboard authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </ScrollArea>
    </>
  );
}
