# `tryCatch` Function

This function provides a structured way to handle asynchronous operations that may either succeed or fail, returning a `Result` type that encapsulates the outcome.

## Function Signature

```typescript
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>>
```
## Description 
The `tryCatch` function takes a `Promise<T>` as input and attempts to resolve it. If the promise resolves successfully, it returns a `Success<T>` object containing the resolved value and `null` for the error. If the promise rejects, it catches the error and returns a `Failure<E>` object containing `null` for the response and the caught error.
### `Result` Type
The function returns a `Result<T, E>` type, which is a discriminated union of `Success<T>` and `Failure<E>`.

```typescript
type Success<T> = {
  response: T;
  error: null;
};

type Failure<E> = {
  response: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;
```
-   **`Success<T>`**: Represents a successful operation, where `T` is the type of the resolved value.
-   **`Failure<E>`**: Represents a failed operation, where `E` is the type of the error. The default error type is `Error`.

### Usage
```typescript
async function main() {
  const getPost = fetch('https://jsonplaceholder.typicode.com/todos/1')
  // const result = await tryCatch(getPost); or
  const {response, error} = await tryCatch(getPost);
  if(error !== null) return error;
  const data = await response.json()
  console.log(data)
}
main();
```

## Benefits

-   Provides a consistent and type-safe way to handle asynchronous results.
-   Eliminates the need for repetitive `try...catch` blocks.
-   Makes it easier to handle errors in a structured manner.
-   Allows the type of the error to be specified.