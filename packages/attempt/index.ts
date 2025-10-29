/**
 * Try-catch with an outputted error value, similar to Go.
 * @example
 * ```ts
 * const [error, user] = await attempt(getUserWithEmail(email));
 *
 * if (error) {
 *   return;
 * }
 *
 * console.log(user);
 * ```
 */
export async function attempt<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      return [error as Error];
    });
}
