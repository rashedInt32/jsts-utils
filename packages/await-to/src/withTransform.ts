/**
 * Transforms resolved data from a Promise using a transform function.
 *
 * @param promise - A Promise to transform.
 * @param transform - Function that receives the resolved value.
 * @returns A tuple [error, transformedData].
 */

export async function withTransform<T, R, U = Error>(
  promise: Promise<T>,
  transform: (data: T) => R
): Promise<[U, undefined] | [null, R]> {
  return promise
    .then<[null, R]>((data) => [null, transform(data)])
    .catch<[U, undefined]>((err: U) => [err, undefined]);
}
