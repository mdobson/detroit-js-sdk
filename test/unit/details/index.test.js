import getDetailsFor from "../../../src/utils/getDetailsFor.js";

describe("Details", () => {
  it("should return details for valid detroit address", async () => {
    const details = await getDetailsFor("1465 Chicago Blvd");
    expect(details.attributes.User_fld).toBe("06002546.");
  });

  it("should return pacelpoints instead of centerline unless asked for", async () => {
    const details = await getDetailsFor("4400 Avery");
    expect(details.attributes.Loc_name).toBe("AddressPointGe");
  });
});
