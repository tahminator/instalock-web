import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';

import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider
      forceColorScheme="dark"
      theme={{
        colors: {
          'deep-red': [
            '#ffeaec',
            '#fdd4d6',
            '#f4a7ac',
            '#ec777e',
            '#e64f57',
            '#e3353f',
            '#e22732',
            '#c91a25',
            '#b31220',
            '#9e0419',
          ],
        },
      }}
    >
      <Router />
    </MantineProvider>
  );
}
