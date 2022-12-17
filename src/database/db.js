import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: process.env.PASSWORD,
  database: 'shortly'
});
