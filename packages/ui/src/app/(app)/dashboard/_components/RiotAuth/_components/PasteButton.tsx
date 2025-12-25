import { Button, Center, MantineThemeProvider, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import "react-hook-form";

export function PasteButton({
  onPaste,
  isFormUrlError,
  highlighted,
}: {
  onPaste: (url: string) => void;
  isFormUrlError: boolean;
  highlighted: boolean;
}) {
  const [pasted, setPasted] = useState(false);
  return (
    <Center pb={0}>
      <MantineThemeProvider theme={{ activeClassName: "" }}>
        <Button
          className=""
          color={
            isFormUrlError
              ? "red"
              : pasted
                ? "green"
                : highlighted
                  ? "blue"
                  : "gray"
          }
          size="sm"
          w={40}
          onClick={async () => {
            const text = await navigator.clipboard.readText();
            onPaste(text);
            setPasted(true);
            setTimeout(() => {
              setPasted(false);
            }, 3000);
          }}
          rightSection={
            pasted ? (
              <Center>
                <IconCheck
                  style={{
                    width: rem(20),
                    height: rem(20),
                    marginRight: "14px",
                  }}
                  stroke={1.5}
                />
              </Center>
            ) : (
              <Center>
                <IconCopy
                  style={{
                    width: rem(20),
                    height: rem(20),
                    marginRight: "14px",
                  }}
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
