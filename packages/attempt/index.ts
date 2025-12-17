/**
 * Try-catch with an outputted error value, similar to Go.
 * @example
 * ```ts
 * const [user, error] = await attempt(getUserWithEmail(email));
 *
 * if (error) {
 *   return;
 * }
 *
 * console.log(user);
 * ```
 */
export async function attempt<T>(
  promise: Promise<T>,
): Promise<[T, undefined] | [undefined, Error]> {
  return promise
    .then((data) => {
      return [data, undefined] as [T, undefined];
    })
    .catch((error) => {
      return [undefined, error as Error];
    });
}
