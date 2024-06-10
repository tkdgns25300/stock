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

	test("renders loading state and then finance data", async () => {
		const mockData = {
			result: {
				incomeStatement: [
					{
						stac_yymm: "2023-12",
						sale_account: "10000",
						sale_cost: "5000",
						sale_totl_prfi: "5000",
						bsop_prti: "2000",
						op_prfi: "3000",
						spec_prfi: "0",
						spec_loss: "0",
						thtr_ntin: "1000",
					},
				],
				balanceSheet: [
					{
						stac_yymm: "2023-12",
						total_aset: "20000",
						total_lblt: "10000",
						total_cptl: "10000",
						cras: "5000",
						fxas: "5000",
						flow_lblt: "3000",
						fix_lblt: "7000",
						cpfn: "10000",
					},
				],
				financialRatio: [
					{
						stac_yymm: "2023-12",
						grs: "10%",
						bsop_prfi_inrt: "5%",
						ntin_inrt: "3%",
						roe_val: "12%",
						eps: "1.5",
						sps: "2",
						bps: "20",
						rsrv_rate: "10%",
						lblt_rate: "50%",
					},
				],
				profitRatio: [
					{
						stac_yymm: "2023-12",
						cptl_ntin_rate: "50%",
						self_cptl_ntin_inrt: "25%",
						sale_ntin_rate: "30%",
						sale_totl_rate: "40%",
					},
				],
			},
		};
	});
});
