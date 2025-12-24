import { TierNumber, tierNumberToNameObject } from "@instalock/riot";
import { Card, Flex, Group, Image, Text } from "@mantine/core";

import MatchCard from "@/app/(app)/dashboard/_components/Matches/MatchCard/MatchCard";
import { useGetProfileByPuuid } from "@/app/(app)/search/[puuid]/_components/UserProfile/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";

export default function UserProfile({ puuid }: { puuid: string }) {
  const { status, data } = useGetProfileByPuuid(puuid);

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    return <div>something went wrong</div>;
  }

  if (!data.success) {
    return <div>{data.message}</div>;
  }

  const { rank, riotTag, matches } = data.payload;

  const rankImage = `/tiers/${rank}.webp`;
  const rankName =
    tierNumberToNameObject[(rank?.toString() ?? "0") as TierNumber];

  return (
    <>
      <Card m={"sm"}>
        <Group justify="center" mt="md" mb="xs" gap={"xl"}>
          <Flex direction={"column"} align={"center"}>
            <Image
              src={rankImage}
              className={"aspect-square max-w-24 rounded-full"}
            />
            <Text color={"gray.6"} size={"xs"}>
              {rankName} (may be out-of-date)
            </Text>
          </Flex>
          <Text fw={500} size={"xl"}>
            {riotTag}
          </Text>
        </Group>
      </Card>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-screen px-8 pt-4">
        {matches.map((match, idx) => (
          <MatchCard match={match} viewMore={false} key={idx} />
        ))}
      </div>
    </>
  );
}
