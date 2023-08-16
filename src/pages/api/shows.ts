import { supabase } from "@app/utils/supabaseClient";
import { getCacheControl } from "@app/utils/commonUtil";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl;
  const allowedParams = ["id"];
  const params: any = [];

  url.searchParams.forEach((value, key) => {
    if (allowedParams.includes(key)) {
      params[key] = value;
    }
  });

  const { id } = params;

  const { data: showResults, error: showErr } = await supabase
    .from("shows")
    .select("*")
    .eq("show_id", id);

  if (showErr) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }

  if (!showResults || !showResults[0]) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const output = showResults ? showResults[0] : {};

  return NextResponse.json(
    { data: { ...output } },
    {
      headers: { "Cache-Control": getCacheControl() },
    }
  );
}
