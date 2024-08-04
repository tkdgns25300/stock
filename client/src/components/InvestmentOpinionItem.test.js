import React from "react";
import { render, screen } from "@testing-library/react";
import InvestmentOpinionItem from "./InvestmentOpinionItem";
import "@testing-library/jest-dom/extend-expect";

test("renders InvestmentOpinionItem with correct data and styles", () => {
	const props = {
		stckBsopDate: "2024-08-07",
		invtOpnn: "Buy",
		stckPrpr: "10,000",
		mbcrName: "ABC Analyst",
		htsGoalPrc: "12,000",
	};

	render(<InvestmentOpinionItem {...props} />);
});
