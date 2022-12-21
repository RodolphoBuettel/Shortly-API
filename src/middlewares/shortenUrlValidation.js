import { connection } from "../database/db.js";
import { urlSchema } from "../models/urlsSchema.js";

export async function shortenUrlValidation(req, res, next) {
    const { url } = req.body;
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');

    const { error } = urlSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    if (!token) {
        return res.sendStatus(401);
    }

    let online;

    try {

        const sessionExist = await connection.query(`SELECT * FROM sessions WHERE "userToken" = $1`,
            [token]);

        if (!sessionExist.rows[0]) {
            return res.sendStatus(422);
        }

        online = sessionExist.rows[0];

        const userExist = await connection.query(`SELECT * FROM users WHERE users.id = $1`,
            [online.usersId]);
        if (!userExist) {
            return res.sendStatus(422);
        }
    } catch (error) {
        console.log(error.message);
    }

    req.info = {url, online}

    next();
}