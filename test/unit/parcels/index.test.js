import DetroitApiClient from "../../../src/DetroitApiClient";

const client = new DetroitApiClient();

describe("Parcels", () => {
  it("Should describe parcels", async () => {
    const parcelNumber = await client.parcelNumber("1465 Chicago");
    console.log(parcelNumber);
  });
});
