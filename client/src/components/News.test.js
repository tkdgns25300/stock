import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import News from "../components/News";

global.fetch = jest.fn();

describe("News Component", () => {
	const mockCompanyName = "Apple";

	beforeEach(() => {
		jest.resetAllMocks();
	});
});
