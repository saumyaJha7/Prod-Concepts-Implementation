import mysql from "mysql2/promise";

export const shard1 = mysql.createPool({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "root123",
  database: "appdb",
});

export const shard2 = mysql.createPool({
  host: "localhost",
  port: 3309,
  user: "root",
  password: "root123",
  database: "appdb",
});