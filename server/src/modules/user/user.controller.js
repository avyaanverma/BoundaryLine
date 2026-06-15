import UserService from "./user.service.js";

export default class UserController{
    contructor(){
        this.userService = new UserService();
    }


}