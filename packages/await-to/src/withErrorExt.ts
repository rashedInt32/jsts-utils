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
