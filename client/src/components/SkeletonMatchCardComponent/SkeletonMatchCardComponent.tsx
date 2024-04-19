import { Box, Card, Skeleton } from '@mantine/core';

export default function SkeletonMatchCardComponent() {
  return (
    <Box style={{ flexGrow: 1 }}>
      <Skeleton w="100%" h="416" visible>
        <Card shadow="xs">hi</Card>
      </Skeleton>
    </Box>
  );
}
