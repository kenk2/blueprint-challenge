/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("questions").del();
  await knex("answers").del();
  await knex("diagnoses").del();
  await knex("diagnostic").del();

  await knex("diagnoses").insert([
    { domain: "depression", score: 2, assessment: "PHQ-9" },
    { domain: "mania", score: 2, assessment: "ASRM" },
    { domain: "anxiety", score: 2, assessment: "PHQ-9" },
    { domain: "substance_use", score: 1, assessment: "ASSIST" },
  ]);

  await knex("diagnostic").insert([
    {
      id: "abcd-123",
      name: "BPDS",
      disorder: "Cross-Cutting",
      display_name: "BDS",
      full_name: "Blueprint Diagnostic Screener",
      type: "standard",
      title:
        "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
    },
  ]);

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
