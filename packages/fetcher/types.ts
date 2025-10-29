import { RiotValidateAuthenticationResponse } from "./api/types";

export type FetcherOkAndBody<T> = {
  ok: boolean;
  body: T;
};

export type Fetcher = {
  api: {
    riot: {
      /**
       * `/api/riot/v1/@me` - GET
       */
      validate: () => Promise<
        FetcherOkAndBody<RiotValidateAuthenticationResponse>
      >;
    };
  };
};
