import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultLeft from "../components/ResultLeft";
import { server } from "../mocks/server";
import { rest } from "msw";

// Mock the API response
const mockCompanyData = {
	result: {
		name: "Test Company",
		stockCode: "12345",
		stockType: "typeA",
	},
};

server.use(
	rest.get(`${process.env.REACT_APP_API_SERVER_URI}/company/search`, (req, res, ctx) => {
		return res(ctx.json(mockCompanyData));
	}),
);

describe("ResultLeft Component", () => {});
