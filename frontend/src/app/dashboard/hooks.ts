import { useQuery } from "@tanstack/react-query";

const useRiotAuthCheck = () =>
  useQuery({
    queryKey: ["riot", "auth"],
    queryFn: checkRiotAuth,
  });

async function checkRiotAuth() {
  const res = await fetch("/api/riot/v1/check");
}
