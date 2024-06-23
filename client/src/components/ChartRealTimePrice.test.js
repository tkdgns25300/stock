import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChartRealTimePrice from "../components/ChartRealTimePrice";

const mockRealTimePriceData = {
	currentPrice: 150000,
	prdyVrss: 1000,
	prdyVrssSign: 1,
};
