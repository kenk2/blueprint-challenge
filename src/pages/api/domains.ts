// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Domain } from "@kenk2/types";
import { getClient } from "@kenk2/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Domain[]>
) {
  const client = await getClient();
  const query: Domain[] = await client("diagnoses").select([
    "domain",
    "assessment",
  ]);

  await client.destroy();
  res.status(200).json(query);
}
