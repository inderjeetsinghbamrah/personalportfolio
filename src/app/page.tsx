import React from "react";
import PortfolioApp from "@/components/PortfolioApp";

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export default function HomePage() {
  return <PortfolioApp />;
}
