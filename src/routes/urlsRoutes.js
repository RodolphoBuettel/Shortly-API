import { Router } from "express";
import { deleteUrl, listUrlById, redirectUrl, shortenUrl } from "../controllers/urlsControllers.js";

const router = Router();

router.post("/urls/shorten", shortenUrl);

router.get("/urls/:id", listUrlById);

router.get("/urls/open/:shortUrl", redirectUrl);

router.delete("/urls/:id", deleteUrl);
export default router;