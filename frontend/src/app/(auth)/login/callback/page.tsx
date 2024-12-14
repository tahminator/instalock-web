import useAuthMutation from "@/app/(auth)/login/callback/_mutation";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function LoginCallbackPage() {
  const [params] = useSearchParams();
  const code = params.get("code");
  const state = params.get("state");

  const navigate = useNavigate();

  const { mutate, status } = useAuthMutation();

  useEffect(() => {
    const id = notifications.show({
      title: "Please wait",
      message: "Attemting to authenticate, please wait...",
    });
    if (!code || !state) {
      notifications.update({
        id,
        title: "Oops",
        message: "Something went wrong. Please try logging in again.",
      });
      return navigate("/login");
    }

    mutate(
      { code, state },
      {
        onSuccess: () => {
          notifications.show({
            id,
            title: "Authenticated",
            message: "You have been successfully logged in!",
          });
          return navigate("/dashboard");
        },
        onError(error, variables, context) {},
      }
    );
  }, [code, mutate, navigate, state]);

  return (
    <LoginCallbackPageWrapper>
      <Loader />
    </LoginCallbackPageWrapper>
  );
}

function LoginCallbackPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
