import bcrypt from "bcrypt";
import { connection } from "../database/db.js";
import {v4 as uuidV4} from "uuid";


export async function signUp(req, res) {
    const { name, email, password} = req.user;

    try {
        const passwordHash = bcrypt.hashSync(password, 10);
        await connection.query(`INSERT INTO users 
        (name, email, password)
         VALUES ($1, $2, $3)`, [name, email, passwordHash]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error.message);
    }
}

export async function signIn(req, res) {
    const userId = req.userId;

    const token = uuidV4();

    try{
        await connection.query(`INSERT INTO sessions
        ("usersId", "userToken")
        VALUES ($1, $2)`, [Number(userId), token]);
        res.sendStatus(200);
    } catch(error){
        console.log(error);
    }
}