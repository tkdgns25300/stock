import React from "react";
import { render, screen } from "@testing-library/react";
import FinancialRatioQuartly from "./FinancialRatioQuartly";
import { FinancialRatioData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	grs: 12.34,
	bsopPrfiInrt: 8.9,
	ntinInrt: 5.67,
	roeVal: 7.89,
	eps: 1234.56,
	sps: 789.01,
	bps: 456.78,
	rsrvRate: 23.45,
	lbltRate: 34.56,
};

const mockPrevData = {
	stacYymm: "2024-07",
	grs: 11.23,
	bsopPrfiInrt: 7.89,
	ntinInrt: 6.78,
	roeVal: 6.78,
	eps: 1122.33,
	sps: 765.43,
	bps: 432.1,
	rsrvRate: 22.34,
	lbltRate: 33.45,
};
