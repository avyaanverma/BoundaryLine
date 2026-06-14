import UserRepo from "../../repositories/user.repository";

export default class AuthService{

    constructor(){
        this.userRepo = new UserRepo();
    }

    async Register(userData){

    }

    async Login(userData){

    }

    async refreshToken(){

    }

    async forgotPassword(){

    }
}