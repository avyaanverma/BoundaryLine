import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();

const userController = new UserController();

export default router;