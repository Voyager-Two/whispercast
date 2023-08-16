import { supabase } from "@app/utils/supabaseClient";
import { ISearchProps } from "@module/types";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl;
  const allowedParams = ["query"];
  const params: any = [];

  url.searchParams.forEach((value, key) => {
    if (allowedParams.includes(key)) {
      params[key] = value;
    }
  });

  const { query } = params;

  let returnProps = {};
  let cues = null;
  let episodeIds: Array<string> = [];

  if (query) {
    const { data: searchResult, error: searchErr } = await supabase
      .from("cues_index")
      .select("*")
      .limit(50)
      .textSearch("fts", query as string, {
        type: "websearch",
        config: "english",
      });
    if (!searchErr) {
      cues = searchResult;
      episodeIds = searchResult.map((c) => c.episode_id);
      // now clear duplicates
      episodeIds = [...new Set(episodeIds)];

      // TODO: use internal API endpoints for these
      const { data: shows, error: showErr } = await supabase
        .from("shows")
        .select("*")
        .eq("show_id", 1);

      const { data: episodes, error: episodeErr } = await supabase
        .from("episodes")
        .select("*")
        .in("episode_id", episodeIds);

      returnProps = {
        cues: cues ?? null,
        episodes: episodes ?? null,
        shows: shows ?? null,
      } as ISearchProps;
    }
  }

  return NextResponse.json(
    { data: { ...returnProps } },
    {
      // Don't cache search results by sending headers.
      headers: { "Cache-Control": "no-store, must-revalidate" },
    }
  );
}
