/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("questions").del();
  await knex("answers").del();
  await knex("answers").insert([
    { value: 0, title: "Not at all" },
    { value: 1, title: "Rare, less than a day or two" },
    { value: 2, title: "Several days" },
    { value: 3, title: "More than half the days" },
    { value: 4, title: "Nearly every day" },
  ]);

  await knex("questions").insert([
    {
      question_id: "question_a",
      domain: "depression",
      title: "Little interest or pleasure in doing things?",
    },
    {
      question_id: "question_b",
      domain: "depression",
      title: "Feeling down, depressed, or hopeless?",
    },
    {
      question_id: "question_c",
      domain: "mania",
      title: "Sleeping less than usual, but still have a lot of energy?",
    },
    {
      question_id: "question_d",
      domain: "mania",
      title:
        "Starting lots more projects than usual or doing more risky things than usual?",
    },
    {
      question_id: "question_e",
      domain: "anxiety",
      title: "Feeling nervous, anxious, frightened, worried, or on edge?",
    },
    {
      question_id: "question_f",
      domain: "anxiety",
      title: "Feeling panic or being frightened?",
    },
    {
      question_id: "question_g",
      domain: "anxiety",
      title: "Avoiding situations that make you feel anxious?",
    },
    {
      question_id: "question_h",
      domain: "substance_use",
      title:
        "Drinking at least 4 drinks of any kind of alcohol in a single day?",
    },
  ]);
};
