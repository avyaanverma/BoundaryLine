import { UserModel } from "../models/user.model";

export default class UserRepo{
    async create(payload){
        return await UserModel.create(payload)
    }
    async findByEmail(email){
        return await UserModel.findOne({email})
    }
    async findByName(name){
        return await UserModel.find({name})
    }
    async findOne(payload){
        return await UserModel.findOne(payload)
    }
}