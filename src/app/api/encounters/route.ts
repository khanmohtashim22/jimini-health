import { NextRequest, NextResponse } from "next/server";
import { getEncounters } from "@/app/api/encounters/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  const validPage = Math.max(1, page);
  const validPageSize = Math.min(100, Math.max(1, pageSize));

  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = getEncounters(validPage, validPageSize);

  return NextResponse.json(data);
}
