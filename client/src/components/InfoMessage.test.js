import React from "react";
import { render, screen } from "@testing-library/react";
import InfoMessage from "./InfoMessage";

test("renders InfoMessage component with title and description", () => {
	const title = "Test Title";
	const description = "<p>This is a <strong>test</strong> description.</p>";

	render(<InfoMessage title={title} description={description} />);

	// Check if the title is rendered correctly
	expect(screen.getByText(title)).toBeInTheDocument();

	// Check if the description is rendered correctly as HTML
	expect(screen.getByText("This is a test description.")).toBeInTheDocument();
	expect(screen.getByText("test")).toBeInTheDocument(); // Check for strong tag rendering

	// Check for proper styling
	const titleElement = screen.getByText(title).closest("h1");
	expect(titleElement).toHaveClass("xl:text-7xl");
	expect(titleElement).toHaveClass("mobile:text-6xl");
	expect(titleElement).toHaveClass("text-5xl");
	expect(titleElement).toHaveClass("font-Rubikfont-normal");
	expect(titleElement).toHaveClass("italic");
	expect(titleElement).toHaveClass("mb-12");

	const descriptionElement = screen.getByText("This is a test description.").closest("p");
	expect(descriptionElement).toHaveClass("xl:text-xl");
	expect(descriptionElement).toHaveClass("desktop:text-lg");
	expect(descriptionElement).toHaveClass("tablet:text-base");
	expect(descriptionElement).toHaveClass("text-sm");
	expect(descriptionElement).toHaveClass("font-Nanum-Gothic");
	expect(descriptionElement).toHaveClass("font-semibold");
});
