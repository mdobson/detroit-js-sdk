import DetroitApiClient from "../../../src/index.js";

const client = new DetroitApiClient();

describe("Parcels", () => {
  it("Should describe parcels", async () => {
    client.parcelNumber("1465 Chicago").then(response => {
      expect(response).toBe("06002546.");
    });
  });
});
