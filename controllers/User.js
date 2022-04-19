const UserModel = require("../models/User");
const code = require("../config/status");

module.exports = class {
  async insert(req, res) {
    try {
      const key = ["firstName", "lastName", "age", "gender"];

      for (let item of key) {
        if (!req.body[item]) {
          res.status(400).json({
            code: code.BAD_REQUEST,
            message: `${item} is required`,
          });
        }
      }

      const newUser = await UserModel.create(req.body);

      res.status(201).send(newUser);
    } catch (err) {
      return {
        code: code.INTERNAL,
        message: err.message,
      };
    }
  }
};
