import React from "react";
import { render, screen } from "@testing-library/react";
import IncomeStatementQuartly from "./IncomeStatementQuartly";
import { BalanceSheetData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	totalAset: 100000,
	cras: 50000,
	fxas: 50000,
	totalCptl: 30000,
	cpfn: 15000,
	totalLblt: 50000,
	flow_lblt: 20000,
	fix_lblt: 30000,
};

const mockPrevData = {
	stacYymm: "2024-07",
	totalAset: 95000,
	cras: 45000,
	fxas: 50000,
	totalCptl: 29000,
	cpfn: 14000,
	totalLblt: 51000,
	flow_lblt: 21000,
	fix_lblt: 30000,
};
