import Dashboard from '@/components/Dashboard/Dashboard';
import { ScrollArea } from '@mantine/core';

export function DashboardPage({ authenticated, setAuthenticated }) {
  return (
    <>
      <ScrollArea style={{ height: '100vh' }}>
        <Dashboard authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </ScrollArea>
    </>
  );
}
