import { useUserStore } from "@/app/_store/user";
import { CenteredSpinner } from "@/components/ui/centered-spinner";
import { useAuthCheck, useAuthStore } from "@/lib/client/auth";
import { ApiType } from "@/lib/client/schema/api";
import { notifications } from "@mantine/notifications";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CallbackPage() {
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

  notifications.show({
    title: "Please wait",
    message: "Logging you in...",
  });

  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    notifications.show({
      title: "Error",
      message: "Invalid callback URL",
      color: "red",
    });
    setTimeout(() => navigate("/login"), 500);
  }

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch(
        `/api/auth/discord/callback?code=${code}&state=${state}`
      );
      const json: ApiType<User> = await res.json();

      if (!res.ok) {
        notifications.show({
          title: "Error",
          message: json.message,
          color: "red",
        });
        navigate("/login");
      }

      const user = json.data;

      useUserStore.getState().setUser(user);
      useAuthStore.getState().setAuth(true);

      notifications.show({
        title: "Success",
        message: "Logged in successfully",
        color: "green",
      });

      navigate("/dashboard");
    };
    checkAuth();
  }, []);

  return <CenteredSpinner />;
}
