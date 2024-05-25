import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompanyInfo from "../components/CompanyInfo";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Description from "../components/Description";
import CompanyDetailTable from "../components/CompanyDetailTable";

jest.mock("../components/Title", () => () => <div>Title Component</div>);
jest.mock("../components/SubTitle", () => () => <div>SubTitle Component</div>);
jest.mock("../components/Description", () => () => <div>Description Component</div>);
jest.mock("../components/CompanyDetailTable", () => () => <div>CompanyDetailTable Component</div>);

describe("CompanyInfo Component", () => {
	test("renders correctly with company data", () => {
		const companyData = {
			address: "123 Main St",
			capital: "1000000",
			ceo: "John Doe",
			currency: "USD",
			description: "A leading company in the industry.",
			detailed_name: "Detailed Company Name",
			english_name: "Company Inc.",
			fiscal_month: 12,
			founded_date: "2000-01-01",
			id: 1,
			industry_code: "001",
			industry_name: "Tech",
			main_phone: "555-5555",
			name: "Company Name",
			website: "https://www.company.com",
		};

		render(<CompanyInfo companyData={companyData} stockCode="12345" stockType="Common" />);

		expect(screen.getByText("Title Component")).toBeInTheDocument();
		expect(screen.getByText("SubTitle Component")).toBeInTheDocument();
		expect(screen.getByText("Description Component")).toBeInTheDocument();
		expect(screen.getByText("CompanyDetailTable Component")).toBeInTheDocument();
	});

	test("renders nothing when companyData is null", () => {
		render(<CompanyInfo companyData={null} stockCode={null} stockType={null} />);

		expect(screen.queryByText("Title Component")).not.toBeInTheDocument();
		expect(screen.queryByText("SubTitle Component")).not.toBeInTheDocument();
		expect(screen.queryByText("Description Component")).not.toBeInTheDocument();
		expect(screen.queryByText("CompanyDetailTable Component")).not.toBeInTheDocument();
	});
});
