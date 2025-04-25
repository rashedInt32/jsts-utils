/**
 * Extends any caught error object with additional properties.
 *
 * @param promise - A Promise to catch errors from.
 * @param errorExt - Extra properties to add to the error object.
 * @returns A tuple [extendedError, data].
 */

export async function withErrorExt<T, U = Error>(
  promise: Promise<T>,
  errorExt: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data) => [null, data])
    .catch<
      [U, undefined]
    >((err: U) => [Object.assign({}, err, errorExt), undefined]);
}
