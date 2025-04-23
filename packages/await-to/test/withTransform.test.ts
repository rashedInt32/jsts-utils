import { describe, expect, it } from "vitest";
import { withTransform } from "../src";

describe("withTransform", () => {
  it("should transform the result", async () => {
    const [err, result] = await withTransform(
      Promise.resolve(42),
      (data) => data * 2
    );
    expect(err).toBeNull();
    expect(result).toBe(84);
  });

  it("should transform the error", async () => {
    const [err, result] = await withTransform(
      Promise.reject(new Error("foo")),
      () => {}
    );
    expect(err).toBe("foo");
    expect(result).toBeUndefined();
  });
});
