import { Button, Card } from "@mantine/core";
import { Link } from "react-router-dom";

export default function LiveMatchCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder bg={"dark.8"}>
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        Looking for the Live Select Agent feature? Click the button below.
      </div>
      <div className="mt-auto">
        <Link to={"/live"}>
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "blue" }}
            fullWidth
            mt="md"
            radius="md"
            disabled
          >
            Select Agent (Disabled due to a bug)
          </Button>
        </Link>
      </div>
    </Card>
  );
}
