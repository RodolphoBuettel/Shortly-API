import { connection } from "../database/db.js";


export async function listMyUrls(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const userExist = await connection.query(`SELECT "usersId" FROM sessions WHERE "userToken" = $1`, [token]);
        if (!userExist.rows[0]) {
            res.sendStatus(404);
        }
        const userUrls = await connection.query(`SELECT users.id, users.name,
         SUM(urls."visitCount") AS "visitCount" FROM users
         JOIN urls ON users.id = urls."userId" 
         WHERE users.id = $1
         GROUP BY users.id`, [userExist.rows[0].usersId]);
        res.send(userUrls.rows)
    } catch (error) {
        console.log(error.message);
    }
}

export async function ranking(req, res) {
    try {
        const rank = await connection.query(`SELECT users.id, users.name,
        COUNT("visitCount") AS "linksCount",
        COALESCE(SUM("visitCount"),0) AS "visitCount" FROM
        users LEFT JOIN urls ON urls."userId" = users.id GROUP BY users.name, users.id
        ORDER BY "visitCount" DESC LIMIT 10`);
        res.status(200).send(rank.rows);
    } catch (error) {
        console.log(error.message);
    }

}