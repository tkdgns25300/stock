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

	test("renders loading state and then news articles", async () => {
		const mockNewsData = {
			result: [
				{
					title: "News Article 1",
					link: "http://example.com/1",
					pubDate: "2024-08-01",
					content: "Content of News Article 1",
					contentSnippet: "Snippet 1",
					guid: "1",
					isoDate: "2024-08-01T00:00:00Z",
				},
				{
					title: "News Article 2",
					link: "http://example.com/2",
					pubDate: "2024-08-02",
					content: "Content of News Article 2",
					contentSnippet: "Snippet 2",
					guid: "2",
					isoDate: "2024-08-02T00:00:00Z",
				},
			],
		};

		fetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockNewsData),
			}),
		);

		render(<News companyName={mockCompanyName} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
		});

		expect(screen.getByText("News Article 1")).toBeInTheDocument();
		expect(screen.getByText("News Article 2")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Load More"));

		// Simulate the next page load with additional articles if needed
		// You would mock additional fetch results here if necessary

		expect(fetch).toHaveBeenCalledTimes(1); // Check if fetch was called once
	});

	test("handles error state", async () => {
		fetch.mockImplementation(() =>
			Promise.resolve({
				ok: false,
				status: 500,
			}),
		);

		render(<News companyName={mockCompanyName} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
		});

		// Check for an appropriate error message or behavior
		// Depending on how your component handles errors, you might want to add more checks here
	});

	test("reset articles and page when companyName changes", async () => {
		const mockNewsData = {
			result: [
				{
					title: "News Article 1",
					link: "http://example.com/1",
					pubDate: "2024-08-01",
					content: "Content of News Article 1",
					contentSnippet: "Snippet 1",
					guid: "1",
					isoDate: "2024-08-01T00:00:00Z",
				},
			],
		};

		fetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockNewsData),
			}),
		);

		const { rerender } = render(<News companyName={mockCompanyName} />);

		await waitFor(() => {
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
			expect(screen.getByText("News Article 1")).toBeInTheDocument();
		});

		rerender(<News companyName="Microsoft" />);

		expect(screen.queryByText("News Article 1")).not.toBeInTheDocument();
	});
});
