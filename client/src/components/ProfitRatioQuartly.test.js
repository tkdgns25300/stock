import React from "react";
import { render, screen } from "@testing-library/react";
import ProfitRatioQuartly from "./ProfitRatioQuartly";
import { ProfitRatioData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	cptlNtinRate: 15.67,
	selfCptlNtinInrt: 10.34,
	saleNtinRate: 7.89,
	saleTotlRate: 12.34,
};

const mockPrevData = {
	stacYymm: "2024-07",
	cptlNtinRate: 14.56,
	selfCptlNtinInrt: 9.45,
	saleNtinRate: 6.78,
	saleTotlRate: 11.23,
};
