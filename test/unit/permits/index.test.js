import DetroitApiClient from "../../../src/index.js";

const client = new DetroitApiClient();

describe("Permits", () => {
  it("should return with permit data for correct addresses", async () => {
    const permits = await client.permits("7255 RUTHERFORD", "ALL");
    expect(permits.length).toBeGreaterThanOrEqual(1);
  });

  it("should not return closed permits by default", async () => {
    const permits = await client.permits("7255 RUTHERFORD");
    expect(permits.length).toBeLessThanOrEqual(0);
  });
});
