import userModel from "../model/user.model.js";
// using a class for user repo for production ready code

export default class UserRepo {
  // function to create a user using payload in {}
  async create(payload) {
    return await userModel.create(payload);
  }

  async createUser(payload) {
    return this.create(payload);
  }

  // function to find a user using email
  async findByEmail(email) {
    return await userModel
      .findOne({ email: email.toLowerCase() })
      .select("+password");
  }

  async findByGoogleId(googleId) {
    return await userModel.findOne({ googleId });
  }

  // function to find a user using id
  async findById(id) {
    return await userModel.findById(id);
  }

  async findOne(payload) {
    return await userModel.findOne(payload).select("+password");
  }

  // function to find all users by ROLES.SUPER_ADMIN
  // async findAll(){
  //     return await userModel.findAll();
  // }

  async findOneAndUpdate(filter, update) {
    return await userModel.findOneAndUpdate(filter, update, { new: true });
  }

  async linkGoogleAccount(userId, payload) {
    return await userModel.findByIdAndUpdate(userId, payload, { new: true });
  }

  async updateRole(email, role) {
    return await userModel.updateOne({ email }, { $set: { role } });
  }
  async findAll(skip = 0, limit = 10) {
    return await userModel
      .find({ isDeleted: false })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  async countUsers() {
    return await userModel.countDocuments({
      isDeleted: false,
    });
  }

  async updateById(id, payload) {
    return await userModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async softDeleteById(id) {
    return await userModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      },
    );
  }

  async findByEmailWithoutPassword(email) {
    return await userModel.findOne({
      email: email.toLowerCase(),
    });
  }
}
