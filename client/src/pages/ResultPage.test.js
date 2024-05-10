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

describe("ResultPage Component", () => {});
