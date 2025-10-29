import sj from "superjson";

/** JSON with superjson capabilities.
 * @example
 * ```ts
 * return res.send(
    SJ.stringify({
      hello: "world",
      user: res.locals.user,
      session: res.locals.session,
      thisFails: res.locals.thisFails,
      timestamp: new Date(),
    })
  );
 * ```
 */
export const SJ = {
  stringify(data: unknown) {
    return sj.stringify(data);
  },

  parse<T = unknown>(data: string) {
    return sj.parse<T>(data);
  },
};
