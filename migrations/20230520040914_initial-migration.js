/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.hasTable("questions").then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable("questions", (table) => {
        table.string("question_id");
        table.string("domain");
        table.string("title");
      });
    }
  });

  await knex.schema.hasTable("diagnoses").then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable("diagnoses", (table) => {
        table.string("domain");
        table.tinyint("score", 1);
        table.string("assessment");
      });
    }
  });

  await knex.schema.hasTable("diagnostic").then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable("diagnostic", (table) => {
        table.string("id");
        table.string("name");
        table.string("disorder");
        table.string("display_name");
        table.string("full_name");
        table.string("title");
        table.string("type");
      });
    }
  });

  return await knex.schema.hasTable("answers").then(async (exists) => {
    if (!exists) {
      return await knex.schema.createTable("answers", (table) => {
        table.string("title");
        table.tinyint("value", 1);
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
    .dropTableIfExists("answers")
    .dropTableIfExists("diagnostic")
    .dropTableIfExists("diagnoses");
};
