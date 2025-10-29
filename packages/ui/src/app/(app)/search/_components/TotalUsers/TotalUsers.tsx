import { useFetchTotalUserCount } from "@/app/(app)/search/_components/TotalUsers/hooks";
import { Center, Loader, Text } from "@mantine/core";

export default function TotalUsers() {
  const { status, data } = useFetchTotalUserCount();

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error") {
    return <div>something went wrong.</div>;
  }

  if (!data.success) {
    return <div>{data.message}</div>;
  }

  const { total, registered, totalMatches } = data.payload;

  return (
    <Center>
      <Text size={"xl"} ta={"center"}>
        The Instalock database contains{" "}
        <Text
          span
          variant={"gradient"}
          gradient={{ from: "deep-red.4", to: "deep-red" }}
        >
          {total}
        </Text>{" "}
        users, of which{" "}
        <Text
          span
          variant={"gradient"}
          gradient={{ from: "purple", to: "red" }}
        >
          {registered}
        </Text>{" "}
        have registered to Instalock, with{" "}
        <Text span variant={"gradient"} gradient={{ from: "blue", to: "cyan" }}>
          {totalMatches}
        </Text>{" "}
        total matches tracked.
      </Text>
    </Center>
  );
}
