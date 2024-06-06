import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chart from "../components/Chart";
import { PeriodDiv } from "../types/Chart/enum";

// Mock the fetch function
global.fetch = jest.fn();

describe("Chart Component", () => {
	const mockStockCode = "AAPL";

	beforeEach(() => {
		jest.resetAllMocks();
	});
});
