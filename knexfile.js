// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
