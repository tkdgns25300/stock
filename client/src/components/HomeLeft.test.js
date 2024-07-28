import React from "react";
import { render, screen } from "@testing-library/react";
import HomeLeft from "./HomeLeft";
import Search from "./Search";

// Mock the Search component
jest.mock("./Search", () => () => <div>Search Component</div>);

test("renders HomeLeft component with Search component", () => {
	render(<HomeLeft />);

	// Check if the Search component is rendered
	expect(screen.getByText("Search Component")).toBeInTheDocument();

	// Check if HomeLeft has the correct styling
	const container = screen.getByText("Search Component").closest("div");
	expect(container).toHaveClass("w-screen");
	expect(container).toHaveClass("desktop:w-1/2");
	expect(container).toHaveClass("h-screen");
	expect(container).toHaveClass("bg-black");
	expect(container).toHaveClass("flex");
	expect(container).toHaveClass("flex-col");
	expect(container).toHaveClass("justify-center");
	expect(container).toHaveClass("items-center");
});
