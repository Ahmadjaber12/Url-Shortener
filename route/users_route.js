import express from "express";
import * as UserController from "../controller/users_controller.js";
const router = express.Router();

router.post("/auth/registeration", UserController.register);
router.post("/auth/login", UserController.login);
router.get("/users/profiles", UserController.Profile);
router.put("/users/profiles", UserController.UpdateProfile);
router.delete("/users/deleteAccount", UserController.deleteAccount);
export default router;
