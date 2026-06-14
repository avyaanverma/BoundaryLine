import UserService from "./user.service.js";

export default class UserController{
    constructor(){
        this.userService = new UserService();
    }


}