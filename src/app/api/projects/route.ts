import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio-data";

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json({
    status: "ok",
    total: data.projects.length,
    projects: data.projects,
  });
}
