import { app_config } from "../../constant/app.constant.js";
import UserRepo from "../../repository/user.repository.js";
import env from "../../config/env.js";
import jwt from "jsonwebtoken";
import AppError from "../../shared/error/app.error.js";
import { StatusCodes } from "http-status-codes";
import NotFound from "../../shared/error/notFound.error.js";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async makeAdmin(email) {
    return await this.userRepo.findOneAndUpdate({ email }, { role: "ADMIN" });
  }

  async createOrFindUser(payload) {
    // first check the user already exists in the db or not
    const isExist = await this.userRepo.findByEmail(payload.email);
    if (isExist) {
      return isExist;
    }
    return await this.userRepo.create(payload);
  }

  async registerService(payload) {
    const isExist = await this.userRepo.findByEmail(payload.email);
    if (isExist) {
      throw new AppError("User Already Exists.", StatusCodes.CONFLICT);
    }
    const newUser = await this.userRepo.create(payload);

    const data = {
      _id: newUser._id,
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      picture: newUser.picture,
      role: newUser.role,
    };

    const accessToken = jwt.sign(
      data,
      env.ACCESS_TOKEN_SECRET,
      app_config().jwt.accessToken,
    );
    const refreshToken = jwt.sign(
      data,
      env.REFRESH_TOKEN_SECRET,
      app_config().jwt.refreshToken,
    );

    return { accessToken, refreshToken };
  }

  async loginService(payload) {
    const user = await this.userRepo.findByEmail(payload.email);

    // validations for email and password is needed here

    if (!user) {
      throw new NotFound("Email not found.");
    }

    console.log("Payload:", payload);
    console.log("User:", user);
    console.log("User Password:", user?.password);

    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    const data = {
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
    };

    const accessToken = jwt.sign(
      data,
      env.ACCESS_TOKEN_SECRET,
      app_config().jwt.accessToken,
    );

    const refreshToken = jwt.sign(
      data,
      env.REFRESH_TOKEN_SECRET,
      app_config().jwt.refreshToken,
    );

    return { accessToken, refreshToken, user };
  }

  async googleLogin(user) {
    const result = await this.createOrFindUser({
      email: user.emails[0].value,
      picture: user.photos[0].value,
      name: user.displayName,
    });

    const data = {
      _id: result._id,
      email: result.email,
      name: result.name,
      picture: result.picture,
      role: result.role,
    };

    // const data = {
    //   _id: result._id,
    //   email: "om@exmple.com",
    //   name: "Om Mhatre",
    //   role: "ADMIN",
    // };

    const accessToken = jwt.sign(
      data,
      env.ACCESS_TOKEN_SECRET,
      app_config().jwt.accessToken,
    );

    const refreshToken = jwt.sign(
      data,
      env.REFRESH_TOKEN_SECRET,
      app_config().jwt.refreshToken,
    );

    return { accessToken, refreshToken };
  }
}
