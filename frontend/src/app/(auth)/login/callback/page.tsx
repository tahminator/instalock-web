import useAuthMutation from "@/app/(auth)/login/callback/_mutation";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function LoginCallbackPage() {
  const [params] = useSearchParams();
  const code = params.get("code");
  const state = params.get("state");
  const error = params.get("error");

  const navigate = useNavigate();

  const { mutate } = useAuthMutation();

  useEffect(() => {
    const id = notifications.show({
      message: "Attempting to authenticate, please wait...",
    });

    if (error) {
      notifications.update({
        id,
        message: "Authentication has been cancelled.",
        color: "red",
      });
      return navigate("/");
    }

    if (!code || !state) {
      notifications.update({
        id,
        message: "Something went wrong. Please try logging in again.",
        color: "red",
      });
      return navigate("/login");
    }

    mutate(
      { code, state },
      {
        onSuccess: (context) => {
          if (context.success) {
            notifications.update({
              id,
              message: context.message,
              color: "green",
            });
            return navigate("/dashboard");
          }
          notifications.update({
            id,
            message: context.message,
            color: "red",
          });
          return navigate("/login");
        },
      }
    );
  }, [code, error, mutate, navigate, state]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Loader />
    </div>
  );
}
