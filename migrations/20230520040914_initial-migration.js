/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.hasTable("questions").then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable("questions", (table) => {
        table.string("question_id").primary();
        table.string("domain");
        table.string("title");
      });
    }
  });

  return await knex.schema.hasTable("answers").then(async (exists) => {
    if (!exists) {
      return await knex.schema.createTable("answers", (table) => {
        table.string("title");
        table.tinyint("value", 1).primary();
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return await knex.schema
    .dropTableIfExists("questions")
    .dropTableIfExists("answers");
};
