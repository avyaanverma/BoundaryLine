import mongoose from "mongoose";
import { ROLES } from "../constant/role.constant.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim:true, lowercase:true, unique: true},
    googleId: {type: String, trim: true, unique: true, sparse: true},
    password: {
      type: String,
      required() {
        return !this.googleId;
      },
      minlength: 6,
      select: false,
    },
    role: {type: String, enum: Object.values(ROLES), default: ROLES.SCORER},
    isDeleted: {type: Boolean, default: false},
    picture: {  
      type: String,
      default:
        "https://imgs.search.brave.com/jHDp_R14w-tbRDiYsyiOCGDeCSPE4WqsVfFwiXVDyow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzY4LzUwLzU3/LzM2MF9GXzExNjg1/MDU3OTRfSUJDRWlh/ZnNJckhGSjA5ZTY1/UDJ2aDUxMTVDMVhJ/N2UuanBn",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // basicall this is also a middleware of mongoose
  if (!this.isModified("password") || !this.password) {
    next();
    return;
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
