import mongoose from "mongoose";
import { ROLES } from "../constant/role.constant.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim:true, lowercase:true},
    password: {type: String, required: true, minlength: 6},
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
  if (!this.isModified("password")) return; // if password is changed then hash it

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
