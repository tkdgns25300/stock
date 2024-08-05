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

	// Verify the rendered content
	expect(screen.getByText(props.stckBsopDate)).toBeInTheDocument();
	expect(screen.getByText(props.invtOpnn)).toBeInTheDocument();
	expect(screen.getByText("12,000")).toBeInTheDocument(); // Goal Price
	expect(screen.getByText("20.00%")).toBeInTheDocument(); // Disparity Rate
	expect(screen.getByText(props.mbcrName)).toBeInTheDocument();

	// Verify text color based on the comparison
	const goalPriceCell = screen.getByText("12,000").closest("td");
	expect(goalPriceCell).toHaveClass("text-red-500"); // Because goal price is higher

	const disparityRateCell = screen.getByText("20.00%").closest("td");
	expect(disparityRateCell).toHaveClass("text-red-500"); // Because disparity is positive

	// Verify that cells with class "tablet:table-cell hidden" are not visible on smaller screens
	expect(screen.queryByText(props.invtOpnn)).toHaveClass("tablet:table-cell");
	expect(screen.queryByText("20.00%")).toHaveClass("tablet:table-cell");
});
