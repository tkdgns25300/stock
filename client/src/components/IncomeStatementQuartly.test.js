import React from "react";
import { render, screen } from "@testing-library/react";
import IncomeStatementQuartly from "./IncomeStatementQuartly";
import { IncomeStatementData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	saleAccount: 50000,
	saleCost: 30000,
	saleTotlPrfi: 20000,
	bsopPrti: 10000,
	opPrfi: 5000,
	thtrNtin: 2000,
};

const mockPrevData = {
	stacYymm: "2024-07",
	saleAccount: 45000,
	saleCost: 25000,
	saleTotlPrfi: 20000,
	bsopPrti: 9000,
	opPrfi: 4000,
	thtrNtin: 1500,
};
