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

server.use(
	rest.get("/api/chart", (req, res, ctx) => res(ctx.json(mockChartData))),
	rest.get("/api/finance", (req, res, ctx) => res(ctx.json(mockFinanceData))),
	rest.get("/api/news", (req, res, ctx) => res(ctx.json(mockNewsData))),
	rest.get("/api/investment-opinion", (req, res, ctx) => res(ctx.json(mockInvestmentOpinionData))),
);

describe("ResultRight Component", () => {
	test("renders Chart, Finance, News, and InvestmentOpinion components", () => {
		render(<ResultRight companyName="TestCompany" stockCode="12345" stockType="typeA" />);

		expect(screen.getByText("Chart")).toBeInTheDocument();
		expect(screen.getByText("Finance")).toBeInTheDocument();
		expect(screen.getByText("News")).toBeInTheDocument();
		expect(screen.getByText("Investment Opinion")).toBeInTheDocument();
	});
});
