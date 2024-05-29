import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubTitle from "../components/SubTitle";

describe("SubTitle Component", () => {
	test("renders correctly with given props", () => {
		render(<SubTitle englishName="English Name" foundedDate="January 1, 2000" />);

		expect(screen.getByText("English Name")).toBeInTheDocument();
		expect(screen.getByText("(January 1, 2000~)")).toBeInTheDocument();
	});
});
