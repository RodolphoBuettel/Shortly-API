import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const connection = new Pool({
  connectionString: process.env.DATABE_URL,
  ssl: true
});
