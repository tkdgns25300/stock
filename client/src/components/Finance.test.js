import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Finance from "../components/Finance";

global.fetch = jest.fn();

describe("Finance Component", () => {
	const mockStockCode = "AAPL";

	beforeEach(() => {
		jest.resetAllMocks();
	});
});
