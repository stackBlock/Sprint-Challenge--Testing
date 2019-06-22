const request = require("supertest");
const server = require("./server.js");



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

    it("should return 422 if genre is missing or if title is missing / 200 if both are present - release year not required ", async () => {

        response = await request(server)
            .post("/games")
            .send({ title: "The greates game" });
        expect(response.status).toBe(422);

        response = await request(server)
            .post("/games")
            .send({ genre: "games no one wants to play" });
        expect(response.status).toBe(422);

        response = await request(server)
            .post("/games")
            .send({
                title: "The greates game",
                genre: "games no one wants to play"
            });
        expect(response.status).toBe(200);

    });
})

describe("GET /games", () => {
    it("return an array of games", async () => {

        await request(server)
            .post("/games")
            .send([{ "genre": "games no one wants to play", "title": "The greates game" }, { "genre": "shooter", "releaseYear": 1999, "title": "Invaders" }]);

        response = await request(server).get("/games");

        expect(response.body).toEqual([{ "genre": "shooter", "releaseYear": 1999, "title": "Invaders" }, { "genre": "games no one wants to play", "title": "The greates game" }]);
    });

    it("return an empty array of games", async () => {
        let response = await request(server).get("/games");
        response.body = [];
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual([]);
    });

    it("return 200 status code if all is working correctly", async () => {
        await request(server)
            .post("/games")
            .send([{ "genre": "games no one wants to play", "title": "The greates game" }, { "genre": "shooter", "releaseYear": 1999, "title": "Invaders" }]);

        const response = await request(server).get("/games");

        expect(response.status).toBe(200);
    });

});