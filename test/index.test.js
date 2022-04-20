const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../test");
const expect = chai.expect;

chai.should();

chai.use(chaiHttp);

const newUser = {
  firstName: "Imron",
  lastName: "Shoimov",
  age: 18,
  gender: "male",
};

describe("User", () => {
  describe("Create User", () => {
    it("should create a new user", () => {
      chai
        .request(server)
        .post("/user")
        .send(newUser)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(typeof response).to.equal("object");
        });
    });
  });
});
