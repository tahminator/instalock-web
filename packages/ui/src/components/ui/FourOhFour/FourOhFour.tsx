import { Button, Group, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function FourOhFour() {
  const navigate = useNavigate();
  return (
    <div
      className={
        "p-20 flex flex-col items-center justify-center w-screen h-screen space-y-8"
      }
    >
      <div className={"text-center font-extrabold text-5xl"} color={"gray"}>
        404
      </div>
      <Title className={"text-center font-extrabold text-2xl"}>
        Womp Womp.
      </Title>
      <Text c="dimmed" size="lg" ta="center" className={""}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={() => navigate("/")}>
          Take me back to home page
        </Button>
      </Group>
    </div>
  );
}
