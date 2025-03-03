type Success<T> = {
  response: T;
  error: null;
};
type Failure<E> = {
  response: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const response = await promise;
    return { response, error: null };
  } catch (error) {
    return { response: null, error: error as E };
  }
}
