const UserModel = require("../models/User");
const code = require("../config/status");

class UserController {
  async insert(req, res) {
    try {
      const key = ["firstName", "lastName"];

      for (let item of key) {
        if (!req.body[item]) {
          res.status(400).json({
            code: code.BAD_REQUEST,
            message: `${item} is required`,
          });
        }
      }

      const newUser = await UserModel.create(req.body);

      res.status(201).send({ data: newUser });
    } catch (err) {
      return {
        code: code.INTERNAL,
        message: err.message,
      };
    }
  }

  async get(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).json({
          code: code.BAD_REQUEST,
          message: `User ID is required`,
        });
      }

      const user = await UserModel.findOne({ _id: req.params.id });

      if (!user) {
        res.status(400).json({
          code: code.NOT_FOUND,
          message: `User not found`,
        });
      }

      res.status(200).send({ data: user });
    } catch (err) {
      return {
        code: code.INTERNAL,
        message: err.message,
      };
    }
  }

  async getAll(req, res) {
    try {
      const options = {
        skip: req.body.offset ? req.body.offset : 0,
        limit: req.body.limit ? req.body.limit : 50,
        sort: { created_at: -1 },
      };

      const users = await UserModel.find({}, {}, options);

      const count = await UserModel.countDocuments();

      res.status(200).send({ data: users, count });
    } catch (err) {
      return {
        code: code.INTERNAL,
        message: err.message,
      };
    }
  }

  async update(req, res) {
    try {
      const key = ["firstName", "lastName"];

      if (!req.params.id) {
        res.status(400).json({
          code: code.BAD_REQUEST,
          message: `User ID is required`,
        });
      }

      for (let item of key) {
        if (!req.body[item]) {
          res.status(400).json({
            code: code.BAD_REQUEST,
            message: `${item} is required`,
          });
        }
      }

      const foundUser = await UserModel.findOne({ _id: req.params.id });

      if (!foundUser) {
        res.status(400).json({
          code: code.NOT_FOUND,
          message: `User not found`,
        });
      }

      foundUser.firstName = req.body.firstName;
      foundUser.lastName = req.body.lastName;
      foundUser.age = req.body.age;
      foundUser.gender = req.body.gender ? req.body.gender : foundUser.gender;
      foundUser.updated_at = new Date();

      await foundUser.save();

      res.status(200).send({ data: foundUser });
    } catch (err) {
      return {
        code: code.INTERNAL,
        message: err.message,
      };
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).json({
          code: code.BAD_REQUEST,
          message: `User ID is required`,
        });
      }

      const deletedUser = await UserModel.findOneAndDelete({
        _id: req.params.id,
      });

      if (!deletedUser) {
        res.status(400).json({
          code: code.NOT_FOUND,
          message: `User not found`,
        });
      }

      res.status(200).send({ data: deletedUser });
    } catch (err) {
      return {
        code: code.INTERNAL,
        message: err.message,
      };
    }
  }
}

module.exports = { UserController };
