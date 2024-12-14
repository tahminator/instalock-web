import { useAuthQuery } from "@/lib/auth";
import { Paper, Button, Text, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";
import { FaDiscord } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { data, status } = useAuthQuery();

  if (status === "pending") {
    return (
      <LoginPageWrapper>
        <Loader />
      </LoginPageWrapper>
    );
  }

  if (status === "error") {
    notifications.show({
      title: "Oops",
      message:
        "Something went wrong. Please refresh the page or try again later.",
    });
    return <></>;
  }

  if (data.user || data.session) {
    navigate("/dashboard");
    // This won't render, so it doesn't matter.
    return <></>;
  }

  return (
    <LoginPageWrapper>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500} className="text-center !font-extrabold">
          Welcome to Instalock{null}
        </Text>

        <Link to="/api/auth/v1/discord" reloadDocument>
          <Button
            className="my-6 w-full"
            size="md"
            variant="gradient"
            gradient={{ from: "gray", to: "blue", deg: 45 }}
            leftSection={<FaDiscord />}
          >
            Login with Discord
          </Button>
        </Link>

        <Link to="/">
          <Text className="text-center hover:underline">← Go back home</Text>
        </Link>
      </Paper>
    </LoginPageWrapper>
  );
}

function LoginPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
