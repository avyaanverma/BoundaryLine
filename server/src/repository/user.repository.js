import userModel from "../model/user.model.js";
// using a class for user repo for production ready code

export default class UserRepo {
  // function to create a user using payload in {}
  async createUser(payload) {
    return await userModel.create(payload);
  }

  // function to find a user using email
  async findByEmail(email) {
    return await userModel.findByEmail(email);
  }

  // function to find a user using id
  async findById(id) {
    return await userModel.findById(id);
  }

  async findOne(payload){
    return await UserModel.findOne(payload)
  }

  // function to find all users by ROLES.SUPER_ADMIN
  // async findAll(){
  //     return await userModel.findAll();
  // }
}
