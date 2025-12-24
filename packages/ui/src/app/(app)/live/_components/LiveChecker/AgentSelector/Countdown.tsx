import { Text } from "@mantine/core";
import { useState } from "react";

import { useInterval } from "@/lib/use-interval";

export default function Countdown({ start }: { start: number }) {
  const [countdown, setCountdown] = useState(start);

  useInterval(() => {
    if (countdown > 0) {
      setCountdown((prev) => prev - 1);
    }
  }, 1000);

  return (
    <Text c={countdown >= 10 ? "blue" : "red"} className="text-3xl!">
      {countdown}
    </Text>
  );
}
