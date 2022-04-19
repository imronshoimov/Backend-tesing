const UserModel = require("../models/User");

module.exports = class {
  async insert(req, res) {
    try {
      const newUser = await UserModel.create(req.body);

      res.status(201).send({
        message: "OK",
        data: newUser,
      });
    } catch (err) {
      throw new Error(`User controller error: ${e}`);
    }
  }
};
