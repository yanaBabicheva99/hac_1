const UserModel = require("../models/userModel");
const Role = require("../models/roleModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, name, age) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const userRole = await Role.findOne({ value: "USER" });
    // const userRole = { value: "ADMIN" }
    const user = await UserModel.create({
      name,
      age,
      email,
      password: hashPassword,
      activationLink,
      role: userRole.value,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка авторизации");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest(`Пользовать с почтой ${email} не найден`);
    }

    const isPasswordEquals = await bcrypt.compare(password, candidate.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(candidate);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = tokenService.findToken(refreshToken);

    if (!tokenFromDb || !userData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id); ///_id
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getUser(id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  }

  async updateRole(id, content) {
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: content },
      { new: true }
    );
    return user;
  }

  async change(id, body) {
    const { name, age, gender } = body;
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw {
        status: "INVALID_DATA",
      };
    }

    await user.updateOne({ name, age, gender });

    return user;
  }
}

module.exports = new UserService();
