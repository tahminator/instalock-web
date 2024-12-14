import { SJ } from "@instalock/sj";
import { ApiDefault } from "@instalock/types";
import { useMutation } from "@tanstack/react-query";

const useLogoutMutation = () =>
  useMutation({
    mutationKey: ["auth", "signout"],
    mutationFn: logoutFlow,
  });

async function logoutFlow() {
  try {
    const res = await fetch("/api/auth/v1/logout", {
      method: "POST",
    });

    const { success, message } = SJ.parse(await res.text()) as ApiDefault;

    return { success, message };
  } catch {
    return {
      success: false,
      message: "Failed to log out. Please try logging out again.",
    };
  }
}

export default useLogoutMutation;
