import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import env from "../../../config/env.js";
import { app_config } from "../../../constant/app.constant.js";
import UserRepo from "../../../repository/user.repository.js";
import AppError from "../../../shared/error/AppError.js";
import NotFound from "../../../shared/error/NotFound.js";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  buildTokenPayload(user) {
    // What: keep JWT payloads small and free of password hashes.
    // Why: tokens are client-visible data, so they should only contain identity claims.
    // How: map the user document to the fields needed by downstream middleware/UI.
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
    };
  }

  signTokens(payload) {
    // What: sign access and refresh tokens with validated env secrets.
    // Why: all login flows should share one token policy.
    // How: use the runtime app config for expiry options.
    const config = app_config(env.NODE_ENV);
    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, config.jwt.accessToken);
    const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, config.jwt.refreshToken);

    return { accessToken, refreshToken };
  }

  async makeAdmin(email) {
    return this.userRepo.findOneAndUpdate({ email }, { role: "ADMIN" });
  }

  async createOrFindUser(payload) {
    // What: reuse an existing account by email or create it.
    // Why: Google OAuth callbacks should be idempotent.
    // How: check email first, then insert the normalized payload.
    const existingUser = await this.userRepo.findByEmail(payload.email);

    if (existingUser) {
      return existingUser;
    }

    return this.userRepo.create(payload);
  }

  async registerService(payload) {
    const existingUser = await this.userRepo.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError("User already exists.", StatusCodes.CONFLICT);
    }

    const newUser = await this.userRepo.create(payload);
    const tokenPayload = this.buildTokenPayload(newUser);

    return this.signTokens(tokenPayload);
  }

  async loginService(payload) {
    const user = await this.userRepo.findByEmail(payload.email);

    if (!user) {
      throw new NotFound("Email not found.");
    }

    if (!user.password) {
      throw new AppError("Password login is not enabled for this account.", StatusCodes.UNAUTHORIZED);
    }

    const isMatch = await user.comparePassword(payload.password);

    if (!isMatch) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    const tokenPayload = this.buildTokenPayload(user);
    const tokens = this.signTokens(tokenPayload);

    return { ...tokens, user: tokenPayload };
  }

  async googleLogin(googleProfile) {
    const email = googleProfile.emails?.[0]?.value;

    if (!email) {
      throw new AppError("Google profile email is required.", StatusCodes.BAD_REQUEST);
    }

    const user = await this.createOrFindUser({
      googleId: googleProfile.id,
      email,
      picture: googleProfile.photos?.[0]?.value,
      name: googleProfile.displayName || email,
    });
    const tokenPayload = this.buildTokenPayload(user);

    return this.signTokens(tokenPayload);
  }
}
