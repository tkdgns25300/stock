import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InvestmentOpinion from "../components/InvestmentOpinion";

global.fetch = jest.fn();

describe("InvestmentOpinion Component", () => {
	const mockStockCode = "AAPL";

	beforeEach(() => {
		jest.resetAllMocks();
	});
});
