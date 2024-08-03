import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logo from "./Logo";
import LogoSvg from "../assets/images/logo1.svg";

// Mocking the logo SVG import
jest.mock("../assets/images/logo1.svg", () => "mock-logo.svg");

test("renders Logo component with correct image and link", () => {
	render(
		<MemoryRouter>
			<Logo />
		</MemoryRouter>,
	);

	// Check if the image is rendered correctly
	const logoImage = screen.getByAltText("Logo");
	expect(logoImage).toBeInTheDocument();
	expect(logoImage).toHaveAttribute("src", "mock-logo.svg");
	expect(logoImage).toHaveClass("absolute");
	expect(logoImage).toHaveClass("w-56");
	expect(logoImage).toHaveClass("p-0");
	expect(logoImage).toHaveClass("m-6");

	// Check if the Link component has the correct href
	const linkElement = screen.getByAltText("Logo").closest("a");
	expect(linkElement).toHaveAttribute("href", "/");
});
