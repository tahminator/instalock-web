import { useAuthCheck, useAuthStore } from "@/lib/client/auth";
import { Button, Paper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    useAuthCheck().then((auth) => {
      useAuthStore.getState().setAuth(auth);
      if (auth) {
        notifications.show({
          title: "Already logged in",
          message: "Redirecting to dashboard...",
        });
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Instalock
        </Text>

        <Link to="/api/auth/discord" reloadDocument>
          <Button
            className="my-6 w-full"
            size="md"
            variant="gradient"
            gradient={{ from: "gray", to: "blue", deg: 45 }}
          >
            Login with Discord
          </Button>
        </Link>

        <Link to="/">
          <Text className="text-center hover:underline">← Go back home</Text>
        </Link>
      </Paper>
    </div>
  );
}
