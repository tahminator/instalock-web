import { Button, Card } from "@mantine/core";
import { Link } from "react-router-dom";

export default function LiveMatchCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder bg={"dark.8"}>
      <div className="flex flex-col items-center justify-center text-center grow">
        Looking for the Live Match features? Click the button below.
      </div>

      <div className="mt-auto">
        <Link to={"/live"}>
          <Button
            variant="gradient"
            gradient={{ from: "blue", to: "red.7" }}
            fullWidth
            mt="md"
            radius="md"
          >
            Live Match features
          </Button>
        </Link>
      </div>
    </Card>
  );
}
