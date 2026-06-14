import { app_config } from "../../constant/app.constant.js";
import UserRepo from "../../repository/user.repository.js";
import env from "../../config/env.js";
import jwt from "jsonwebtoken";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async CreateUser(user) {
    // first check the user already exists in the db or not
    const isExist = await this.userRepo.findByEmail(user.emails[0].value);
    let result = isExist;

    if (!isExist) {
      const newUser = await this.userRepo.create({
        email: user.emails[0].value,
        picture: user.photos[0].value,
        name: user.displayName,
      });
      result = newUser;
    }

    const data = {
      _id: result._id,
      email: user.emails[0].value,   
      name: user.displayName,
      picture: user.photos[0].value,
      role: result.role,
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
}
