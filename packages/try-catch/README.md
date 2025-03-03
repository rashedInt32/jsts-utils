# `tryCatch` Function

This function provides a structured way to handle asynchronous operations that may either succeed or fail, returning a `Result` type that encapsulates the outcome.

## Function Signature

```typescript
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>>