import { Box, Card, Skeleton } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useEffect } from 'react';

export default function SkeletonMatchCardComponent({
  setHeight,
  setWidth,
}: {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { ref, width, height } = useElementSize();

  useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [width, height, ref]);

  return (
    <Box style={{ flexGrow: 1 }}>
      <Skeleton w="100%" h="416" visible ref={ref}>
        <Card shadow="xs">hi</Card>
      </Skeleton>
    </Box>
  );
}
