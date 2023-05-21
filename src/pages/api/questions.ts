import { Answer, Diagnostic, DiagnosticMeta, Question } from "@kenk2/types";
import { getClient, toCamelCase } from "@kenk2/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Diagnostic>
) {
  const client = await getClient();

  const questionsQuery: Question[] = (
    await client("questions").select(["question_id", "title"])
  ).map(toCamelCase);
  const answersQuery: Answer[] = (await client("answers").select("*")).map(
    toCamelCase
  );
  const diagnosticMetaQuery = await client("diagnostic").first().where({
    id: "abcd-123",
  });

  const diagnosticMeta: DiagnosticMeta = toCamelCase(diagnosticMetaQuery);
  const form: Diagnostic = {
    id: diagnosticMeta.id,
    name: diagnosticMeta.name,
    disorder: diagnosticMeta.disorder,
    fullName: diagnosticMeta.fullName,
    content: {
      sections: [
        {
          answers: answersQuery,
          questions: questionsQuery,
          type: diagnosticMeta.type,
          title: diagnosticMeta.title,
        },
      ],
      displayName: diagnosticMeta.displayName,
    },
  };

  await client.destroy();
  res.status(200).json(form);
}
