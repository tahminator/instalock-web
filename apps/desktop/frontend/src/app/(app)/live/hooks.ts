import useRiotAuthQuery from "@/app/(app)/dashboard/hooks";
import { useEffect } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

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
  const { data } = useRiotAuthQuery();

  const state = useAuthStore(useShallow((state) => ({ ...state })));

  const { setRiotAuth, setRiotEntitlement, setPuuid } = state;

  useEffect(() => {
    if (data) {
      setRiotAuth(data.authToken);
      setRiotEntitlement(data.entitlement);
      setPuuid(data.puuid);
    }
  }, [data, setPuuid, setRiotAuth, setRiotEntitlement]);

  return { ...state };
};

// type preGameStoreType = {
//   pregameId: string | undefined;
//   setPregameId: (pregameId: string | undefined) => void;
// };

// export const usePreGameStore = create<preGameStoreType>()((set) => ({
//   pregameId: undefined,
//   setPregameId: (pregameId) => set({ pregameId }),
// }));
