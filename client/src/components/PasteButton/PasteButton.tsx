import { Button, Center, rem, Tooltip, UnstyledButton } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { MantineThemeProvider } from '@mantine/core';

export function PasteButton({ form, highlighted }) {
  const [pasted, setPasted] = useState(false);
  return (
    <Center pb={0}>
      <MantineThemeProvider theme={{ activeClassName: '' }}>
        <Button
          className={''}
          color={form.errors.url ? 'red' : pasted ? 'green' : highlighted ? 'blue' : 'gray'}
          size="sm"
          w={40}
          onClick={async () => {
            const text = await navigator.clipboard.readText();
            form.setFieldValue('url', text);
            setPasted(true);
            setTimeout(() => {
              setPasted(false);
            }, 3000);
          }}
          rightSection={
            pasted ? (
              <Center>
                <IconCheck
                  style={{ width: rem(20), height: rem(20), marginRight: '14px' }}
                  stroke={1.5}
                />
              </Center>
            ) : (
              <Center>
                <IconCopy
                  style={{ width: rem(20), height: rem(20), marginRight: '14px' }}
                  stroke={1.5}
                />
              </Center>
            )
          }
        />
      </MantineThemeProvider>
    </Center>
  );
}
