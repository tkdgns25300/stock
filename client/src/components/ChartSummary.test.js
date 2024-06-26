import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChartSummary from "../components/ChartSummary";

const mockPriceInfoData = {
	stckPrpr: 150000,
	prdyVrss: 1000,
	stckLwpr: 145000,
	stckHgpr: 155000,
	w52Lwpr: 120000,
	w52Hgpr: 170000,
	htsAvls: "1000000",
};
