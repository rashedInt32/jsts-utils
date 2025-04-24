export async function withRejectIf<T, U = Error>(
  promise: Promise<T>,
  rejectIf: (data: T) => boolean,
  rejectionError?: U | ((data: T) => U)
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then((data) => {
      if (rejectIf(data)) {
        const err =
          typeof rejectionError === "function"
            ? (rejectionError as (data: T) => U)(data)
            : rejectionError || (new Error("Rejected by condition") as U);
        throw err;
      }
      return data;
    })
    .then<[null, T]>((data) => [null, data])
    .catch<[U, undefined]>((err: U) => [err, undefined]);
}
