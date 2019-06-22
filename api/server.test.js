const request = require("supertest");
const server = require("./server.js");

// beforeEach(async () => {
//     const temp = await request(server).delete("/games");
// });

describe("Sanity Check - server up", () => {
    test("should server Up ", async () => {
        let response = await request(server).get("/");

        expect(response.body).toEqual({ message: "Server is running" });
    });
});

describe("/games - POST", () => {
    it("Code 201 should be returned if it works", async () => {
        const response = await request(server)
            .post("/games")
            .send({
                title: "Invaders",
                genre: "shooter",
                releaseYear: 1999
            });
        expect(response.body).toEqual({
            title: "Invaders",
            genre: "shooter",
            releaseYear: 1999
        });
    });

    it('check for JSON', async () => {
        let response = await request(server).post('/games');

        expect(response.type).toBe('application/json');
    });
})
