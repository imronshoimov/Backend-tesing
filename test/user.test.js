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

const optionExample = { offset: 0, limit: 2 };

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

    it("should return required if firstname does not exist", () => {
      const example = { ...exampleUser };
      delete example.firstName;
      chai
        .request(server)
        .post("/user")
        .send(example)
        .end((err, response) => {
          expect(response.body.code).includes("INVALID_ARGUMENT");
          expect(response.body.message).includes("firstName is required");
          expect(err).to.equal(null);
        });
    });

    it("should return required if lastname does not exist", () => {
      const example = { ...exampleUser };
      delete example.lastName;
      chai
        .request(server)
        .post("/user")
        .send(example)
        .end((err, response) => {
          expect(response.body.code).includes("INVALID_ARGUMENT");
          expect(response.body.message).includes("lastName is required");
          expect(err).to.equal(null);
        });
    });
  });

  describe("Get User", () => {
    const userId = "da206b3e-b951-4010-bfdb-c91231ac7722";
    it("should get user", () => {
      chai
        .request(server)
        .get("/user/" + userId)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(typeof response.body.data).to.equal("object");
          expect(response.body.data._id).to.equal(userId);
        });
    });

    it("should return not found if id is invalid", () => {
      chai
        .request(server)
        .get("/user/" + "ssss")
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(response.body.code).includes("NOT_FOUND");
          expect(response.body.message).includes("User not found");
        });
    });
  });

  describe("Get All Users", () => {
    it("should get all users", () => {
      const option = { ...optionExample };
      chai
        .request(server)
        .get("/users")
        .send(option)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(typeof response.body.data).to.equal("object");
          expect(typeof response.body.count).to.equal("number");
        });
    });
  });

  describe("Update User", () => {
    const userId = "da206b3e-b951-4010-bfdb-c91231ac7722";
    it("should update user", () => {
      const example = { ...exampleUser };
      chai
        .request(server)
        .put("/user/" + userId)
        .send(example)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(typeof response.body.data).to.equal("object");
        });
    });

    it("should return required if firstname does not exist", () => {
      const example = { ...exampleUser };
      delete example.firstName;
      chai
        .request(server)
        .put("/user/" + userId)
        .send(example)
        .end((err, response) => {
          expect(response.body.code).includes("INVALID_ARGUMENT");
          expect(response.body.message).includes("firstName is required");
          expect(err).to.equal(null);
        });
    });

    it("should return required if lastname does not exist", () => {
      const example = { ...exampleUser };
      delete example.lastName;
      chai
        .request(server)
        .put("/user/" + userId)
        .send(example)
        .end((err, response) => {
          expect(response.body.code).includes("INVALID_ARGUMENT");
          expect(response.body.message).includes("lastName is required");
          expect(err).to.equal(null);
        });
    });
  });

  describe("Delete User", () => {
    const userId = "da206b3e-b951-4010-bfdb-c91231ac7722";
    it("should delete user", () => {
      chai
        .request(server)
        .delete("/user/" + userId)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(typeof response.body.data).to.equal("object");
          expect(response.body.data._id).to.equal(userId);
        });
    });

    it("should return not found if id is invalid", () => {
      chai
        .request(server)
        .delete("/user/" + "sss")
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(response.body.code).to.equal("NOT_FOUND");
          expect(response.body.message).to.equal("User not found");
        });
    });
  });
});
