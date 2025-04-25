# @jsts-utils/await-to

> Clean, powerful, and composable async utilities for better Promise handling in JavaScript.

**Version:** 0.1.0\
**License:** MIT\
**Platform:** Node.js / Browser (ES Modules or CommonJS)

---

## 🔧 Why?

No more scattered `try/catch` or verbose `then/catch` chains. This toolkit helps you write **clean**, **composable**, and **predictable** async code — especially in large codebases or when building SDKs/libraries.

---

## 💼 Installation

```bash
npm install @jsts-utils/await-to
```

---

## ⚙️ Usage

### `to(promise)`

```ts
/**
 * Wraps a Promise and returns a tuple of [error, data].
 * Useful for avoiding try/catch.
 *
 * @param promise - A promise to handle.
 * @returns A tuple [error, data], where error is null on success.
 */
```
Returns a `[error, data]` tuple.

```js
import { to } from '@jsts-utils/await-to';

const [err, res] = await to(fetch('/api'));
if (err) return console.error('Failed:', err);

console.log('Success:', res);
```

---

### `withTimeout(promise, timeoutMs)`

```ts
/**
 * Resolves or rejects a Promise within the specified timeout (ms).
 * If the timeout elapses first, returns a timeout error.
 *
 * @param promise - A promise to race with a timeout.
 * @param timeout - Timeout duration in milliseconds.
 * @returns A tuple [error, data].
 */
```
Rejects if the Promise doesn’t resolve in time.

```js
import { withTimeout } from '@jsts-utils/await-to';

const [err, res] = await withTimeout(fetch('/api'), 2000); // 2 seconds
```

---

### `withRetry(promiseFn, retries, delayMs?)`

```ts
/**
 * Retries a Promise-returning function up to `retries` times on failure.
 * Optional delay (ms) between retries.
 *
 * @param promiseFn - A function that returns a Promise.
 * @param retries - Number of retry attempts.
 * @param delay - Optional delay between retries in ms.
 * @returns A tuple [error, data].
 */
```
Retries a Promise-returning function on failure.

```js
import { withRetry } from '@jsts-utils/await-to';

const [err, data] = await withRetry(() => fetch('/unstable'), 3, 500);
```

---

### `withTransform(promise, transformFn)`

```ts
/**
 * Transforms resolved data from a Promise using a transform function.
 *
 * @param promise - A Promise to transform.
 * @param transform - Function that receives the resolved value.
 * @returns A tuple [error, transformedData].
 */
```
Transforms data after successful resolution.

```js
import { withTransform } from '@jsts-utils/await-to';

const [err, name] = await withTransform(fetchUser(), user => user.name);
```

---

### `withFallback(promise, fallbackPromise)`

```ts
/**
 * Resolves with the first fulfilled result between `promise` and `fallback`.
 *
 * @param promise - Primary Promise.
 * @param fallback - Fallback Promise if primary fails.
 * @returns A tuple [error, data].
 */
```
Use a fallback if the original Promise fails.

```js
import { withFallback } from '@jsts-utils/await-to';

const [err, data] = await withFallback(fetchPrimary(), fetchBackup());
```

---

### `withHooks(promise, { onSuccess, onError })`

```ts
/**
 * Attaches side-effect callbacks on success or failure of a Promise.
 * Useful for logging, UI feedback, etc.
 *
 * @param promise - A Promise to monitor.
 * @param hooks - Lifecycle hooks for success or error.
 * @returns A tuple [error, data].
 */
```
Attach lifecycle hooks without cluttering your flow.

```js
import { withHooks } from '@jsts-utils/await-to';

const [err, data] = await withHooks(fetch('/api'), {
  onSuccess: (data) => console.log('Success:', data),
  onError: (err) => console.warn('Failed:', err)
});
```

---

### `withRejectIf(promise, rejectIfFn, errorMessage?)`

```ts
/**
 * Conditionally rejects a resolved value if the predicate `rejectIf` is true.
 * Optional `rejectionError` can be a string, error, or function.
 *
 * @param promise - The Promise whose result to validate.
 * @param rejectIf - Predicate that returns true to reject the result.
 * @param rejectionError - Error value or function to use when rejected.
 * @returns A tuple [error, data].
 */
```
Conditionally reject resolved data.

```js
import { withRejectIf } from '@jsts-utils/await-to';

const [err, user] = await withRejectIf(fetchUser(), user => !user.isActive, 'Inactive user');
```

---

### `withErrorExt(promise, extra)`

```ts
/**
 * Extends any caught error object with additional properties.
 *
 * @param promise - A Promise to catch errors from.
 * @param errorExt - Extra properties to add to the error object.
 * @returns A tuple [extendedError, data].
 */
```
Attach custom metadata to errors.

```js
import { withErrorExt } from '@jsts-utils/await-to';

const [err, res] = await withErrorExt(fetch('/api'), { source: 'user-fetch' });

if (err) console.log(err.source); // 'user-fetch'
```

---

## 🧠 Advanced Tips

### 1. Composable chains

Use these utilities together to build expressive flows:

```js
import {
  to,
  withTimeout,
  withRetry,
  withTransform,
} from '@jsts-utils/await-to';

const [err, name] = await withRetry(
  () =>
    withTimeout(fetchUser(), 3000).then(res =>
      withTransform(Promise.resolve(res), user => user.name)
    ),
  2,
  500
);
```

---

### 2. Minimal global try/catch wrappers

Instead of wrapping every `await` in `try/catch`, use `to()` once at a higher level:

```js
const [err, result] = await to(
  withRetry(() => withTimeout(fetch('/api'), 1500), 3)
);

if (err) return console.error('Final failure:', err);
```

---

### 3. Reusable conditions with `withRejectIf`

```js
const rejectIfNull = (v) => v == null;

const [err, data] = await withRejectIf(fetchData(), rejectIfNull, 'Received null!');
```

---

## 🧪 Test (Coming Soon)

```bash
npm test
```

---

## 📄 License

MIT © YourName or Org

---

> Clean up your async flow, one `await` at a time.

