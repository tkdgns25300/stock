import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "../components/Search";

// Mock fetch for testing
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				result: [
					{ company_name: "Test Company A", stock_code: "12345", stock_type: "보통주" },
					{ company_name: "Test Company B", stock_code: "67890", stock_type: "보통주" },
				],
			}),
	}),
);
