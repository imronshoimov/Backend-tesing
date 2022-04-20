const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../test");
const expect = chai.expect;

chai.should();

chai.use(chaiHttp);

const exampleUser = {
  firstName: "Imron",
  lastName: "Shoimov",
  age: 18,
  gender: "male",
};

describe("User", () => {
  describe("Create User", () => {
    it("should create a new user", () => {
      const example = { ...exampleUser };
      chai
        .request(server)
        .post("/user")
        .send(example)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(typeof response).to.equal("object");
        });
    });

    it("should return required if firstname does not exists", () => {
      const example = { ...exampleUser };
      delete example.firstName;
      chai
        .request(server)
        .post("/user")
        .send(example)
        .end((err, response) => {
          expect(response.body.message).includes("firstName is required");
          expect(err).to.equal(null);
        });
    });

    it("should return required if lastname does not exists", () => {
      const example = { ...exampleUser };
      delete example.lastName;
      chai
        .request(server)
        .post("/user")
        .send(example)
        .end((err, response) => {
          expect(response.body.message).includes("lastName is required");
          expect(err).to.equal(null);
        });
    });

    it("should return required if age does not exists", () => {
      const example = { ...exampleUser };
      delete example.age;
      chai
        .request(server)
        .post("/user")
        .send(example)
        .end((err, response) => {
          expect(response.body.message).includes("age is required");
          expect(err).to.equal(null);
        });
    });
  });
});
