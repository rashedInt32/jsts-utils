import { InferErrTypes, InferOkTypes } from "./_internals/utils";

export namespace Result {}

export type Result<T, E> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> implements IResult<T, E> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return !this.isOk();
  }
}

export class Err<T, E> implements IResult<T, E> {
  constructor(readonly error: E) {}
  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return !this.isOk();
  }
}

interface IResult<T, E> {
  /**
   * Used to check if a `Result` is an `OK`
   *
   * @returns `true` if the result is an `OK` variant of Result
   */
  isOk(): this is Ok<T, E>;

  /**
   * Used to check if a `Result` is an `Err`
   *
   * @returns `true` if the result is an `Err` variant of Result
   */
  isErr(): this is Err<T, E>;

  map<A>(f: (t: T) => A): Result<A, E>;

  mapErr<U>(f: (e: E) => U): Result<T, U>;

  andThen<R extends Result<unknown, unknown>>(
    f: (t: T) => R,
  ): Result<InferOkTypes<R>, InferErrTypes<R> | E>;
  andThen<U, F>(f: (t: T) => Result<U, F>): Result<U, E | F>;
}
