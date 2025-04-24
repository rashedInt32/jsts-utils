export async function withFallback<T, U = Error>(
  promise: Promise<T>,
  fallback: Promise<T>
): Promise<[U, undefined] | [null, T]> {
  return Promise.race([promise, fallback])
    .then<[null, T]>((data) => [null, data])
    .catch<[U, undefined]>((err: U) => [err, undefined]);
}
