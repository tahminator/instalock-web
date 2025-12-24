import { useEffect } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

import useRiotAuthQuery from "@/app/(app)/dashboard/hooks";

type authStoreType = {
  riotAuth: string | undefined;
  setRiotAuth: (riotAuth: string | undefined) => void;
  riotEntitlement: string | undefined;
  setRiotEntitlement: (riotEntitlement: string | undefined) => void;
  puuid: string | undefined;
  setPuuid: (puuid: string | undefined) => void;
};

const useAuthStore = create<authStoreType>()((set) => ({
  riotAuth: undefined,
  setRiotAuth: (riotAuth) => set(() => ({ riotAuth })),
  riotEntitlement: undefined,
  setRiotEntitlement: (riotEntitlement) => set(() => ({ riotEntitlement })),
  puuid: undefined,
  setPuuid: (puuid: string | undefined) => set(() => ({ puuid })),
}));

export const useAuthUpdater = () => {
  const { data, status } = useRiotAuthQuery();

  const state = useAuthStore(useShallow((state) => ({ ...state })));

  const { setRiotAuth, setRiotEntitlement, setPuuid } = state;

  useEffect(() => {
    console.log(status, data);
    if (
      status === "success" &&
      data &&
      data.user &&
      data.user.riotAuth &&
      data.user.riotEntitlement
    ) {
      console.log("YIPEEEEE");
      setRiotAuth(data.user.riotAuth);
      setRiotEntitlement(data.user.riotEntitlement);
      setPuuid(data.user.puuid);
    }
  }, [
    data,
    data.user?.riotAuth,
    data.user?.riotEntitlement,
    setPuuid,
    setRiotAuth,
    setRiotEntitlement,
    status,
  ]);

  return { ...state };
};
