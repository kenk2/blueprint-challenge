import knex from "knex";
import camelCase from "lodash/camelCase";

async function getClient() {
  const client = await knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
  });

  return client;
}

function toCamelCase(record: any): any {
  const result: any = {};
  Object.entries(record).forEach((entry) => {
    const [key, value] = entry;
    result[camelCase(key)] = value;
  });
  return result;
}

export { getClient, toCamelCase };
