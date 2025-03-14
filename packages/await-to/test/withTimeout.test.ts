import { describe, expect, it } from "vitest";
import { withTimeout } from "../src";

describe("to", () => {
  it("should return resolve promise", async () => {
    const [err, data] = await withTimeout(
      Promise.resolve({ name: "John Doe" }),
      300
    );
    expect(err).toBeNull();
    expect(data).toEqual({ name: "John Doe" });
  });
  it("should return reject promise and return error", async () => {
    const [err, data] = await withTimeout(
      Promise.reject({ name: "John Doe" }),
      500
    );
    expect(data).toBeUndefined();
    expect(err).toEqual({ name: "John Doe" });
  });

  it("should reject success promise if it takes more time than timeout value", async () => {
    const promise = new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({ name: "john doe" });
      }, 500);
    });
    const [err, data] = await withTimeout(promise, 300);
    expect(data).toBeUndefined();
    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toMatch(/Promise timed out/);
  });
});
