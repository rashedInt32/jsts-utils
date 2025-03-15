export function withRetry<T, U = Error>(
  promiseFn: () => Promise<T>,
  retries: number,
  delay: number = 0
): Promise<[U, undefined] | [null, T]> {
  const attempt = (
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
