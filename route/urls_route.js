import express from "express";
import * as URLController from "../controller/urls_controller.js";
const router = express.Router();

router.get("/users/urls/:id", URLController.getUrl);
router.post("/users/urls", URLController.createUrl);
router.get("/urls/:code", URLController.urlRedirection);
router.get("/users/urls", URLController.getallUrls);
router.delete("/users/urls/:id", URLController.deleteUrl);

export default router;
