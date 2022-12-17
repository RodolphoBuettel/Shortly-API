import { Router } from "express";
import { signIn, signUp } from "../controllers/authControlles.js";

import signUpValidation from "../middlewares/signUpValidation.js";
import signInValidation from "../middlewares/signInValidation.js";

const router = Router();

router.post("/signup", signUpValidation, signUp);

router.post("/signin", signInValidation, signIn);
export default router;