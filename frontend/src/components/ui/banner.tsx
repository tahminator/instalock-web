import { Box, Button, Collapse, Flex, Text } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import { Link } from "react-router-dom";

export default function Banner() {
  const mounted = useMounted();

  return (
    <Collapse in={mounted}>
      <Box w="100%">
        <Flex
          bg="deep-red.8"
          ta="center"
          direction="column"
          align="center"
          justify="center"
          gap="sm"
          p="10px"
        >
          <Text size="lg">
            Try out the beta Instalock Destkop!
            <Box display="inline" mx="md">
              <Button component={Link} to="/download" bg={"deep-red.5"}>
                Go to download page
              </Button>
            </Box>
          </Text>
        </Flex>
      </Box>
    </Collapse>
  );
}
