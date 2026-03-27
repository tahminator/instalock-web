import { Card } from "@mantine/core";

export default function NoMatchesYetCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder bg={"dark.8"}>
      <div className="flex flex-col items-center justify-center text-center grow">
        Hm, we don't have any matches to show you yet. If you are a new user,
        please wait a couple seconds and refresh to view your previous matches.
      </div>
    </Card>
  );
}
