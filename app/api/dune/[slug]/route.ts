import { DuneClient } from "@duneanalytics/client-sdk";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  if (!process.env.DUNE_API_KEY) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  const client = new DuneClient(process.env.DUNE_API_KEY);

  try {
    const results = await client.custom.getResults({
      handle: "ivanmolto",
      slug: slug,
    });

    return Response.json(results);
  } catch {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
