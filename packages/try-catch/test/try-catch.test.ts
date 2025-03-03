import { describe, expect, it } from "vitest";

import { tryCatch } from "../src";

describe("try catch utility function", () => {
  it("should return data successfully", async () => {
    const testData = { anme: "John Doe" };
    const promise = Promise.resolve(testData);
    const { response, error } = await tryCatch(promise);

    expect(error).toBeNull();
    expect(response).toEqual(testData);
  });

  it("should return error", async () => {
    const testData = { error: "test data not found" };
    const promise = Promise.reject(testData);
    const { response, error } = await tryCatch(promise);

    expect(error).toEqual(testData);
    expect(response).toBeNull();
  });
});
