import mongoose from "mongoose";
import { ROLES } from "../constant/role.constant.js";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true, min: 6},
    role: {type: String, enum: Object.values(ROLES), default: ROLES.SCORER},
    isDeleted: {type: Boolean, default: false}
},
{
    timestamps: true
});

export default mongoose.model("User", userSchema);