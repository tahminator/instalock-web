import { SJ } from "../../../../../packages/sj";
import { ApiDefault } from "@instalock/types";
import { useQuery } from "@tanstack/react-query";
import { GetVersion } from "@w/go/main/App";

export const useVersionQuery = () => {
  return useQuery({
    queryKey: ["wails", "version"],
    queryFn: async () => {
      const res = await GetVersion();

      if (!res || !res.Ok) {
        return { success: false, version: null };
      }

      const json = (await SJ.parse(res.Text)) as ApiDefault<{
        version: string;
      }>;

      if (!json.success) {
        return { success: json.success, version: null };
      }

      return { success: json.success, version: json.payload.version };
    },
    retry: 2,
  });
};
