import { init } from "@instalock/fetcher";
import { Fetcher } from "@instalock/fetcher/types";
import { App } from "@instalock/ui";

const fetcher: Fetcher = {
  api: {
    riot: {
      validate: async () => {
        const res = await fetch("/api/riot/v1/@me");

        return await res.text();
      },
    },
  },
};

init(fetcher);

App.render();
