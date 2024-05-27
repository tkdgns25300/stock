import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "../components/Title";

describe("Title Component", () => {
	test("renders correctly with given props", () => {
		render(<Title name="Company Name" stockCode="12345" stockType="Common" />);

		expect(screen.getByText("Company Name")).toBeInTheDocument();
		expect(screen.getByText("12345")).toBeInTheDocument();
		expect(screen.getByText("Common")).toBeInTheDocument();
	});

	test("renders correctly with null props", () => {
		render(<Title name={null} stockCode={null} stockType={null} />);

		expect(screen.queryByText("Company Name")).not.toBeInTheDocument();
		expect(screen.queryByText("12345")).not.toBeInTheDocument();
		expect(screen.queryByText("Common")).not.toBeInTheDocument();
	});
});
