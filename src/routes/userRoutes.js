import { Router } from "express";
import { listMyUrls, ranking } from "../controllers/usersControllers.js";

const router = Router();

router.get("/user/me", listMyUrls);

router.get("/ranking", ranking)

export default router;