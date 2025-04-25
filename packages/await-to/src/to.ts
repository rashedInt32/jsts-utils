/**
 * Wraps a Promise and returns a tuple of [error, data].
 * Useful for avoiding try/catch.
 *
 * @param promise - A promise to handle.
 * @returns A tuple [error, data], where error is null on success.
 */
export async function to<T, U = Error>(
  promise: Promise<T>
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => [err, undefined]);
}
