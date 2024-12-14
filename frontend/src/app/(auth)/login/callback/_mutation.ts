import { useMutation } from "@tanstack/react-query";

const useAuthMutation = () =>
  useMutation({
    mutationKey: ["auth"],
    mutationFn: async ({ code, state }: { code: string; state: string }) => {
      const res = await fetch(
        `/api/auth/v1/discord/callback?code=${code}&state=${state}`,
        {
          method: "POST",
        }
      );
    },
  });

export default useAuthMutation;
