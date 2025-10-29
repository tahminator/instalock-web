import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Environment } from "@w/runtime";

export const useIsFirstVisit = () => {
  const [loading, setLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const possibleItem = localStorage.getItem("iFV");
    if (possibleItem === null) {
      setIsFirstVisit(true);
      setLoading(false);
      return;
    }

    setIsFirstVisit(possibleItem === "true");
    setLoading(false);
  }, []);

  const toggle = () => {
    const bool = localStorage.getItem("iFV") === "true";
    localStorage.setItem("iFV", String(!bool));
    setIsFirstVisit(!bool);
  };

  return { loading, isFirstVisit, toggle };
};

// Detect the specific platform the Wails application is running on.
export const usePlatformQuery = () => {
  return useQuery({
    queryKey: ["wails", "platform"],
    queryFn: async () => {
      const { platform } = await Environment();
      return platform;
    },
  });
};
