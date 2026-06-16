import UserRepo from "../../../repository/user.repository.js";
import NotFound from "../../../shared/error/NotFound.js";

export default class PublicUserService {
  constructor(userRepo = new UserRepo()) {
    this.userRepo = userRepo;
  }

  async createUser(payload) {
    return this.userRepo.create(payload);
  }

  async getUserById(userId) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }


}