import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultRight from "../components/ResultRight";
import { server } from "../mocks/server";
import { rest } from "msw";

// Mock the data for the child components if necessary
const mockChartData = {
	/* mock data for Chart component */
};
const mockFinanceData = {
	/* mock data for Finance component */
};
const mockNewsData = {
	/* mock data for News component */
};
const mockInvestmentOpinionData = {
	/* mock data for InvestmentOpinion component */
};
