import { Card, Skeleton } from "@mantine/core";

export default function SkeletonMatchCardComponent() {
  return (
    <Skeleton className="max-h-[30rem] min-h-[23rem]">
      <Card shadow="xs">hi</Card>
    </Skeleton>
  );
}
