import Conflict from "../../../shared/error/Conflict.js";
import NotFound from "../../../shared/error/NotFound.js";
import UserRepo from "../../../repository/user.repository.js";
import { getIO } from "../../../socket/index.js";

class UserService {
  constructor(userRepository = new UserRepo()) {
    this.userRepository = userRepository;
  }

  async getAllUsers({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userRepository.findAll(skip, limit),
      this.userRepository.countUsers(),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(userId) {
    const user =
      await this.userRepository.findById(userId);

    if (!user || user.isDeleted) {
      throw new NotFound("User not found");
    }

    return user;
  }

  async createUser(payload) {
    const normalizedPayload = {
      ...payload,
      email: payload.email.toLowerCase(),
    };

    const existingUser =
      await this.userRepository.findByEmailWithoutPassword(
        normalizedPayload.email
      );

    if (existingUser && !existingUser.isDeleted) {
      throw new Conflict(
        "User with this email already exists"
      );
    }

    const user =
      await this.userRepository.create(
        normalizedPayload
      );

    // socket emit
    try {
      getIO().emit("user-created", {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (_error) {}

    return user;
  }

  async updateUserRole(userId, role) {
    const user =
      await this.userRepository.findById(
        userId
      );

    if (!user || user.isDeleted) {
      throw new NotFound("User not found");
    }

    const updatedUser =
      await this.userRepository.updateById(
        userId,
        { role }
      );

    if (!updatedUser) {
      throw new NotFound("User not found");
    }

    // socket emit
    try {
      getIO().emit(
        "user-role-updated",
        {
          userId: updatedUser._id,
          role: updatedUser.role,
        }
      );
    } catch (_error) {}

    return updatedUser;
  }

  async deleteUser(userId) {
    const user =
      await this.userRepository.findById(
        userId
      );

    if (!user || user.isDeleted) {
      throw new NotFound("User not found");
    }

    const deletedUser =
      await this.userRepository.softDeleteById(
        userId
      );

    if (!deletedUser) {
      throw new NotFound("User not found");
    }

    // socket emit
    try {
      getIO().emit("user-deleted", {
        userId: deletedUser._id,
      });
    } catch (_error) {}

    return deletedUser;
  }
}

export default UserService;
