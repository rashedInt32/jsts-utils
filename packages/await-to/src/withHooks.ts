/**
 * Attaches side-effect callbacks on success or failure of a Promise.
 * Useful for logging, UI feedback, etc.
 *
 * @param promise - A Promise to monitor.
 * @param hooks - Lifecycle hooks for success or error.
 * @returns A tuple [error, data].
 */

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
