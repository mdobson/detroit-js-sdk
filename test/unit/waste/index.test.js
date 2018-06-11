import DetroitApiClient from "../../../src/index.js";

const client = new DetroitApiClient();

// Should mock these responses
describe("Waste", () => {
    it("should be formatted correctly", async() => {
        const pickupDate = await client.waste("1465 Chicago Blvd", "trash");
        expect(pickupDate).toHaveProperty(["date"]);
        expect(pickupDate).toHaveProperty(["provider"]);
    });

    it("should return error for malformed address", async() => {
        const pickupDate = await client.waste("Nope!");
        expect(pickupDate).toBe("No address found");
    });
});