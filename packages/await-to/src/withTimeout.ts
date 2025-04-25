/**
 * Resolves or rejects a Promise within the specified timeout (ms).
 * If the timeout elapses first, returns a timeout error.
 *
 * @param promise - A promise to race with a timeout.
 * @param timeout - Timeout duration in milliseconds.
 * @returns A tuple [error, data].
 */

export async function withTimeout<T, U = Error>(
  promise: Promise<T>,
  timeout: number
): Promise<[U, undefined] | [null, T]> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<[U, undefined]>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error("Promise timed out") as U),
      timeout
    );
  });

  return Promise.race([
    promise.then((data) => {
      clearTimeout(timeoutId);
      return data;
    }),
    timeoutPromise,
  ])
    .then<[null, T]>((data) => [null, data as T])
    .catch<[U, undefined]>((err) => [err as U, undefined]);
}
