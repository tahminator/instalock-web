import { Card, Skeleton } from "@mantine/core";

export default function SkeletonMatchCardComponent() {
  return (
    <Skeleton className="max-h-96 min-h-72">
      <Card shadow="xs">hi</Card>
    </Skeleton>
  );
}
