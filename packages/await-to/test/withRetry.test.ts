import { describe, it, expect } from "vitest";
import { withRetry } from "../src";

describe("withRetry", () => {
  it("should resolve with the result of the promise", async () => {
    const result = await withRetry(() => Promise.resolve("success"), 3);
    expect(result).toEqual([null, "success"]);
  });

  it("should reject with the error of the promise", async () => {
    const error = new Error("failure");
    const result = await withRetry(() => Promise.reject(error), 3);
    expect(result).toEqual([error, undefined]);
  });

  it("should retry the promise if it rejects", async () => {
    let attempts = 0;
    const maxAttempts = 3;
    const result = await withRetry(
      () => {
        if (attempts < maxAttempts) {
          attempts++;
        }
        return Promise.reject(new Error("failure"));
      },
      maxAttempts,
      100,
    );
    expect(result).toEqual([new Error("failure"), undefined]);
    expect(attempts).toBe(3);
  });
});
