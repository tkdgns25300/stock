import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompanyDetailTable from "../components/CompanyDetailTable";

describe("CompanyDetailTable Component", () => {
	const companyData = {
		address: "123 Business Rd, Suite 100",
		capital: "$1,000,000",
		ceo: "Jane Doe",
		currency: "USD",
		detailed_name: "Business Corp",
		fiscal_month: 12,
		industry_code: "1234",
		industry_name: "Tech",
		main_phone: "555-1234",
		website: "http://www.businesscorp.com",
	};

	test("renders company data correctly", () => {
		render(<CompanyDetailTable companyData={companyData} />);

		expect(screen.getByText("한글명(상세) :")).toBeInTheDocument();
		expect(screen.getByText(companyData.detailed_name)).toBeInTheDocument();

		expect(screen.getByText("주소 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.address)).toBeInTheDocument();

		expect(screen.getByText("대표 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.ceo)).toBeInTheDocument();

		expect(screen.getByText("대표번호 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.main_phone)).toBeInTheDocument();

		expect(screen.getByText("웹사이트:")).toBeInTheDocument();
		expect(screen.getByText(companyData.website)).toHaveAttribute("href", companyData.website);

		expect(screen.getByText("자본금 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.capital)).toBeInTheDocument();

		expect(screen.getByText("통화구분 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.currency)).toBeInTheDocument();

		expect(screen.getByText("결산월 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.fiscal_month.toString())).toBeInTheDocument();

		expect(screen.getByText("업종코드 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.industry_code)).toBeInTheDocument();

		expect(screen.getByText("업종명 :")).toBeInTheDocument();
		expect(screen.getByText(companyData.industry_name)).toBeInTheDocument();
	});
});
