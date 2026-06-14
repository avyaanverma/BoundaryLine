import UserRepo from "../../repository/user.repository";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async CreateUser(user) {
    // pehle check karo ki user exist krta hai ya nahi db mey
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
  }
}
