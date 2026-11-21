import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio-data";

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    data: data.profile,
  });
}
