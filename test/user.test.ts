import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "../src/App";

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET api/v1/users", () => {
    it("responds with JSON array", () => {
        return chai.request(app).get("/api/v1/users")
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an("array");
                expect(res.body).to.have.length(2);
            });
    });

    it("should include Davide", () => {
        return chai.request(app).get("/api/v1/users")
            .then(res => {
                const Davide = res.body.find(hero => hero.Name === "Davide");
                expect(Davide).to.exist;
                expect(Davide).to.have.all.keys([
                    "Id",
                    "Name",
                    "Surname"
                ]);
            });
    });
});

describe("GET api/v1/users/:id", () => {

    it("responds with single JSON object", () => {
        return chai.request(app).get("/api/v1/users/1")
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an("object");
            });
    });

    it("should return Davide Pegoraro", () => {
        return chai.request(app).get("/api/v1/users/1")
            .then(res => {
                expect(res.body.user.Name).to.equal("Davide");
            });
    });
});
