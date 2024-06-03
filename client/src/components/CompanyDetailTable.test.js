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
});
