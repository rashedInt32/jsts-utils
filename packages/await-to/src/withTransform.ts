export async function withTransform<T, R, U = Error>(
  promise: Promise<T>,
  transform: (data: T) => R,
): Promise<[U, undefined] | [null, R]> {
  return promise
    .then<[null, R]>((data) => [null, transform(data)])
    .catch<[U, undefined]>((err: U) => [err, undefined]);
}
