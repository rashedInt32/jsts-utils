# `tryCatch` Function

This function provides a structured way to handle asynchronous operations that may either succeed or fail, returning a `Result` type that encapsulates the outcome.

## Function Signature

```typescript
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>>
```

Description
The tryCatch function takes a Promise<T> as input and attempts to resolve it. If the promise resolves successfully, it returns a Success<T> object containing the resolved value and null for the error. If the promise rejects, it catches the error and returns a Failure<E> object containing null for the response and the caught error.