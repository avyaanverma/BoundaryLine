import UserRepo from "../../repository/user.repository.js";
// overall logic of users
export default class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async CreateUser(user) {
    this.userRepo.create(user);
  }
}
