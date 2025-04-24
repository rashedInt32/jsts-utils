export async function withHooks<T, U = Error>(
  promise: Promise<T>,
  hooks: {
    onSuccess?: (data: T) => void;
    onError?: (err: U) => void;
    onProgress?: (progress: any) => void;
  }
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then((data) => {
      hooks.onSuccess?.(data);
      return data;
    })
    .catch((err: U) => {
      hooks.onError?.(err);
      throw err;
    })
    .then<[null, T]>((data) => [null, data])
    .catch<[U, undefined]>((err: U) => [err, undefined]);
}
