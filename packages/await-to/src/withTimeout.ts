export function withTimeout<T, U = Error>(
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
