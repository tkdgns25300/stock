import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Description from "../components/Description";

describe("Description Component", () => {
	test("renders correctly with given description", () => {
		const description = "This is the first sentence. This is the second sentence.";

		render(<Description description={description} />);

		// Verify that each sentence is rendered correctly
		expect(screen.getByText("This is the first sentence.")).toBeInTheDocument();
		expect(screen.getByText("This is the second sentence.")).toBeInTheDocument();
		expect(screen.getByText("출처 : 에프앤가이드")).toBeInTheDocument();
	});

	test("handles description with non-breaking spaces correctly", () => {
		const description = "This is the first sentence.\u00A0This is the second sentence.";

		render(<Description description={description} />);

		// Verify that the non-breaking space is handled and sentences are split correctly
		expect(screen.getByText("This is the first sentence.")).toBeInTheDocument();
		expect(screen.getByText("This is the second sentence.")).toBeInTheDocument();
		expect(screen.getByText("출처 : 에프앤가이드")).toBeInTheDocument();
	});
});
