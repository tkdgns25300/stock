import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import ResultPage from "./ResultPage";

const setup = (search) => {
	window.history.pushState({}, "Test Page", search);
	render(
		<Router>
			<Route path="/result" component={ResultPage} />
		</Router>,
	);
};

describe("ResultPage Component", () => {
	test("renders ResultLeft and ResultRight components with query parameters", () => {
		setup("?companyName=TestCompany&stockCode=12345&stockType=typeA");

		expect(screen.getByTestId("result-left")).toBeInTheDocument();
		expect(screen.getByTestId("result-right")).toBeInTheDocument();

		expect(screen.getByTestId("result-left")).toHaveTextContent("TestCompany");
		expect(screen.getByTestId("result-left")).toHaveTextContent("12345");
		expect(screen.getByTestId("result-left")).toHaveTextContent("typeA");

		expect(screen.getByTestId("result-right")).toHaveTextContent("TestCompany");
		expect(screen.getByTestId("result-right")).toHaveTextContent("12345");
		expect(screen.getByTestId("result-right")).toHaveTextContent("typeA");
	});
});
