import { supabase } from "@app/utils/supabaseClient";
import { getPagination, getCacheControl } from "@app/utils/commonUtil";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl;
  const allowedParams = ["page"];
  const params: any = [];

  url.searchParams.forEach((value, key) => {
    if (allowedParams.includes(key)) {
      params[key] = value;
    }
  });

  const { page } = params;

  // TODO: validate input better
  let currentPage = page ? Number(page) : 1;
  currentPage = page === 0 ? 1 : currentPage;
  let nextPage: null | number = currentPage === 0 ? 2 : currentPage + 1;

  const { from, to } = getPagination(currentPage, 15);

  const { data: episodes, error: episodeErr } = await supabase
    .from("episodes")
    .select("*")
    .order("episode_id", { ascending: false })
    .range(from, to);

  if (episodeErr) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }

  if (!episodes || episodes.length === 0) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (episodes.length < 15) {
    // Indicates last page
    nextPage = null;
  }

  return NextResponse.json(
    {
      data: {
        episodes,
      },
      currentPage,
      nextPage: nextPage,
    },
    {
      headers: { "Cache-Control": getCacheControl() },
    }
  );
}
