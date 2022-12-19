import bcrypt from "bcrypt";
import { connection } from "../database/db.js";

export default async function signInValidation (req, res, next) {
    const {email, password} = req.body;

    const userExist = await connection.query(`SELECT * FROM users
    WHERE users.email = $1`, [email]);

    if(!userExist.rows[0]){
       return res.sendStatus(401);
    }

    const verifiedPassword = bcrypt.compareSync(password, userExist.rows[0].password);

    if(!verifiedPassword){
         return res.sendStatus(401);
    }

    req.userId = userExist.rows[0].id;

    next();
}