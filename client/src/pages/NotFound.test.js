import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFoundPage from "./NotFound";

describe("NotFoundPage Component", () => {
	test("renders Logo component", () => {
		render(<NotFoundPage />);
		// Check if the Logo component is rendered
		expect(screen.getByTestId("logo")).toBeInTheDocument();
	});

	test("renders NotFoundLeft component", () => {
		render(<NotFoundPage />);
		// Check if the NotFoundLeft component is rendered
		expect(screen.getByTestId("notfound-left")).toBeInTheDocument();
	});

	test("renders NotFoundRight component", () => {
		render(<NotFoundPage />);
		// Check if the NotFoundRight component is rendered
		expect(screen.getByTestId("notfound-right")).toBeInTheDocument();
	});

	test("renders components in the correct layout", () => {
		render(<NotFoundPage />);
		// Check if elements are correctly laid out. Adjust based on actual structure.
		const notFoundLeft = screen.getByTestId("notfound-left");
		const notFoundRight = screen.getByTestId("notfound-right");
		expect(notFoundLeft).toBeInTheDocument();
		expect(notFoundRight).toBeInTheDocument();
	});
});
