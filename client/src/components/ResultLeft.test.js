import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultLeft from "../components/ResultLeft";
import { server } from "../mocks/server";
import { rest } from "msw";

// Mock the API response
const mockCompanyData = {
	result: {
		name: "Test Company",
		stockCode: "12345",
		stockType: "typeA",
	},
};

server.use(
	rest.get(`${process.env.REACT_APP_API_SERVER_URI}/company/search`, (req, res, ctx) => {
		return res(ctx.json(mockCompanyData));
	}),
);

describe("ResultLeft Component", () => {
	test("renders Logo, Search, and CompanyInfo components", async () => {
		render(<ResultLeft companyName="TestCompany" stockCode="12345" stockType="typeA" />);

		expect(screen.getByTestId("logo")).toBeInTheDocument();
		expect(screen.getByTestId("search")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText("Test Company")).toBeInTheDocument();
			expect(screen.getByText("12345")).toBeInTheDocument();
			expect(screen.getByText("typeA")).toBeInTheDocument();
		});
	});

	test("fetches and displays company data", async () => {
		render(<ResultLeft companyName="TestCompany" stockCode="12345" stockType="typeA" />);

		await waitFor(() => {
			expect(screen.getByText("Test Company")).toBeInTheDocument();
			expect(screen.getByText("12345")).toBeInTheDocument();
			expect(screen.getByText("typeA")).toBeInTheDocument();
		});
	});
});
