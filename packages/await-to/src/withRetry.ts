/**
 * Retries a Promise-returning function up to `retries` times on failure.
 * Optional delay (ms) between retries.
 *
 * @param promiseFn - A function that returns a Promise.
 * @param retries - Number of retry attempts.
 * @param delay - Optional delay between retries in ms.
 * @returns A tuple [error, data].
 */

export async function withRetry<T, U = Error>(
  promiseFn: () => Promise<T>,
  retries: number,
  delay: number = 0
): Promise<[U, undefined] | [null, T]> {
  const attempt = async (
    retriesLeft: number
  ): Promise<[U, undefined] | [null, T]> => {
    return promiseFn()
      .then<[null, T]>((data) => [null, data])
      .catch((err: U) => {
        if (retriesLeft > 0) {
          return new Promise(
            (resolve: (value: [U, undefined] | [null, T]) => void) =>
              setTimeout(() => {
                attempt(retriesLeft - 1).then(resolve);
              }, delay)
          );
        }
        return [err, undefined] as [U, undefined];
      });
  };
  return attempt(retries);
}
