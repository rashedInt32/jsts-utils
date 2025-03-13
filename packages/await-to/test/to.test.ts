import { describe, expect, it } from "vitest";
import { to } from "../src";

describe("to", () => {
  it("should return resolve promise", async () => {
    const [err, data] = await to(Promise.resolve({ name: "John Doe" }));
    expect(err).toBeNull();
    expect(data).toBe({ name: "John Doe" });
  });
});
