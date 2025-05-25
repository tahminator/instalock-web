import { useEffect, useState } from "react";

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
