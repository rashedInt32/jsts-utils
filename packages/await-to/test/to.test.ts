import { describe, expect, it } from "vitest";
import { to } from "../src";

describe("to", () => {
  it("should return resolve promise", async () => {
    const [err, data] = await to(Promise.resolve({ name: "John Doe" }));
    expect(err).toBeNull();
    expect(data).toEqual({ name: "John Doe" });
  });
  it("should return reject promise and return error", async () => {
    const [err, data] = await to(Promise.reject({ name: "John Doe" }));
    expect(data).toBeUndefined();
    expect(err).toEqual({ name: "John Doe" });
  });
});
