import { signUpSchema } from "../models/signUpSchema.js";
import { connection } from "../database/db.js";

export default async function signUpValidation (req, res, next){
    const { name, email, password, confirmPassword } = req.body;

    const { error } = signUpSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    if (password !== confirmPassword) {
        return res.sendStatus(409);
    }

    const emailExist = await connection.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailExist.rows[0]) {
        return res.sendStatus(409);
    }

    const nameExist = await connection.query("SELECT * FROM users WHERE email = $1", [name]);
    if (nameExist.rows[0]) {
        return res.sendStatus(409);
    }

    req.user = req.body;

    next();
}