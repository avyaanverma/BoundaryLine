import { Schema, model } from "mongoose";
import { ROLES } from "../constant/userRoles.constant.js";
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.SCORER },
    isDeleted: { type: Boolean, default: false },
    picture: {
      type: String,
      default:
        "https://imgs.search.brave.com/jHDp_R14w-tbRDiYsyiOCGDeCSPE4WqsVfFwiXVDyow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzY4LzUwLzU3/LzM2MF9GXzExNjg1/MDU3OTRfSUJDRWlh/ZnNJckhGSjA5ZTY1/UDJ2aDUxMTVDMVhJ/N2UuanBn",
    },
  },
  { timestamps: true },
);

export const UserModel = model("users", userSchema);
