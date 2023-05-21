import type { NextApiRequest, NextApiResponse } from "next";
import { Answer, DiagnosisScore, QuestionQuery } from "@kenk2/types";
import { getClient, toCamelCase } from "@kenk2/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | { error: string }>
) {
  if (req.method !== "POST") {
    return res
      .status(401)
      .json({ error: "Only POST is allowed on this route." });
  }

  const results: Set<string> = new Set();
  const answers: Answer[] = req.body.answers.map(toCamelCase);
  const client = await getClient();

  const questionQuery: QuestionQuery[] = (
    await client("diagnoses")
      .rightJoin("questions", "diagnoses.domain", "questions.domain")
      .select("*")
  ).map(toCamelCase);

  await client.destroy();
  const counts: { [domain: string]: number } = {};
  const questionDiagnostics: DiagnosisScore = {};

  questionQuery.forEach((question) => {
    questionDiagnostics[question.questionId] = {
      score: question.score,
      assessment: question.assessment,
      domain: question.domain,
    };
  });

  answers.forEach((answer) => {
    const domain = questionDiagnostics[answer.questionId];

    const value = answer.value;
    counts[domain.domain] = counts[domain.domain] + value || value;

    if (counts[domain.domain] >= domain.score) {
      results.add(domain.assessment);
    }
  });

  return res.status(200).json(Array.from(results));
}
