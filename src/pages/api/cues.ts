import { supabase } from "@app/utils/supabaseClient";
import { getCacheControl } from "@app/utils/commonUtil";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl;
  const allowedParams = ["showId", "episodeId"];
  const params: any = [];

  url.searchParams.forEach((value, key) => {
    if (allowedParams.includes(key)) {
      params[key] = value;
    }
  });

  const { showId, episodeId } = params;

  const { data: cuesResults, error: cuesErr } = await supabase
    .from("cues_json")
    .select("*")
    .match({ show_id: showId, episode_id: episodeId });

  if (cuesErr) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }

  if (!cuesResults || !cuesResults[0]) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const output = cuesResults ? cuesResults[0].cues : {};

  return NextResponse.json(
    { data: output },
    {
      headers: { "Cache-Control": getCacheControl() },
    }
  );
}
