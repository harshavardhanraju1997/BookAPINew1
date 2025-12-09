const { drizzle } = require("drizzle-orm/node-postgres");
require("dotenv/config");

//postgres://<username>:<passord>@<host>:<port>:<db_name>
console.log(process.env.DATABASE_URL);
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
