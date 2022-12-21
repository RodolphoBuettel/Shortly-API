import { nanoid } from "nanoid";
import { connection } from "../database/db.js";


export async function shortenUrl(req, res) {
    const {url, online} = req.info;
    
    try {
        const modelId = nanoid(10);
        
        await connection.query(`INSERT INTO urls ("sessionsId", "userId", url, "shortUrl")
        VALUES ($1, $2, $3, $4)`, [online.id, online.usersId, url, modelId]);
        res.status(201).send(modelId);
    }
    catch (error) {
        console.log(error.message);
    }
}

export async function listUrlById(req, res) {
    const { id } = req.params;

    try {
        const urlExist = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE
         urls.id = $1`, [id]);
        if (!urlExist.rows[0]) {
            return res.sendStatus(404);
        }
        res.status(200).send(urlExist.rows[0]);
    } catch (error) {
        console.log(error);
    }
}

export async function redirectUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const shortUrlExist = await connection.query(`SELECT * FROM urls WHERE
        "shortUrl" = $1`, [shortUrl]);
        if (!shortUrlExist.rows[0]) {
            return res.sendStatus(404);
        }
        await connection.query(`UPDATE urls SET "visitCount" = $1
        WHERE "shortUrl" = $2`, [(shortUrlExist.rows[0].visitCount + 1), shortUrl]);
        res.redirect(302, shortUrlExist.rows[0].url);
    } catch (error) {
        console.log(error.message);
    }

}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const sessionExist = await connection.query(`SELECT * FROM sessions WHERE "userToken" = $1`,
            [token]);

        if (!sessionExist.rows[0]) {
            return res.sendStatus(422);
        }

        const urlExist = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        console.log(urlExist.rows[0]);
        if (!urlExist.rows[0]) {
            return res.sendStatus(404);
        }

        if (sessionExist.rows[0].usersId !== urlExist.rows[0].userId) {
            return res.sendStatus(401);
        }

        await connection.query(`DELETE FROM urls WHERE id = $1`, [urlExist.rows[0].id]);

        res.sendStatus(204);
    } catch (error) {
        console.log(error.message);
    }

}