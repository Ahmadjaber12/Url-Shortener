import express from "express";
import * as URLController from "../controller/urls_controller.js";
const router = express.Router();

router.get("/users/urls/:id", URLController.getUrl);
router.post("/users/urls", URLController.CreateUrl);
router.get("/urls/:code", URLController.UrlRedirection);
router.get("/users/urls", URLController.getAllURLS);
router.delete("/users/urls/:id", URLController.DeleteUrl);

export default router;
