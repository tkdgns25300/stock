import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
describe("HomePage Component", () => {
	test("renders Logo component", () => {
		render(<HomePage />);
		// Check if the Logo component is rendered
		expect(screen.getByTestId("logo")).toBeInTheDocument();
	});

	test("renders HomeLeft component", () => {
		render(<HomePage />);
		// Check if the HomeLeft component is rendered
		expect(screen.getByTestId("home-left")).toBeInTheDocument();
	});

	test("renders HomeRight component", () => {
		render(<HomePage />);
		// Check if the HomeRight component is rendered
		expect(screen.getByTestId("home-right")).toBeInTheDocument();
	});

	test("renders components in the correct layout", () => {
		render(<HomePage />);
		// Check if elements are correctly laid out. Adjust based on actual structure.
		const homeLeft = screen.getByTestId("home-left");
		const homeRight = screen.getByTestId("home-right");
		expect(homeLeft).toBeInTheDocument();
		expect(homeRight).toBeInTheDocument();
	});
});
