import { Card, Skeleton } from "@mantine/core";

export default function SkeletonMatchCardComponent() {
  return (
    <Skeleton className="max-h-120 min-h-92">
      <Card shadow="xs">hi</Card>
    </Skeleton>
  );
}
