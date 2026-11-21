import React from "react";
import PortfolioApp from "@/components/PortfolioApp";
import { getPortfolioData } from "@/lib/portfolio-data";

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export default async function HomePage() {
  const data = await getPortfolioData();

  return <PortfolioApp initialData={data} />;
}
