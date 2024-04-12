import Dashboard from '@/components/Dashboard/Dashboard';

export function DashboardPage({ authenticated, setAuthenticated }) {
  return (
    <>
      <Dashboard authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </>
  );
}
