const { ObjectId } = require("mongodb");
const userModel = require("../models/userModel");
const userService = require("../service/user-service");
const jwt = require("jsonwebtoken");
class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  //   --> tests <--

  async saveTest(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw res.status(400).json({
          status: "INVALID_DATA",
        });
      }
      const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const { test_id, tasks } = req.body;
      const candidate = await userModel.findOne({ _id: new ObjectId(user.id) });
      if (!candidate) {
        throw res.status(400).json({
          status: "INVALID_DATA",
        });
      }
      await candidate.updateOne(
        {
          $set: {
            tests: {
              test_id,
              tasks,
            },
          },
        },
        { upsert: true }
      );
      return res.json(candidate);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
