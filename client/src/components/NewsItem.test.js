import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsItem from "./NewsItem";

const mockNewsItem = {
	title: "Sample News Article",
	link: "http://example.com/news-article",
	pubDate: "2024-08-24T12:34:56Z",
	contentSnippet: "This is a sample snippet for the news article.",
};

describe("NewsItem Component", () => {
	test("renders the news item with title, link, snippet, and formatted date", () => {
		render(<NewsItem {...mockNewsItem} />);

		// 제목과 링크가 올바르게 렌더링되었는지 확인
		const titleElement = screen.getByText(mockNewsItem.title);
		expect(titleElement).toBeInTheDocument();
		expect(titleElement.closest("a")).toHaveAttribute("href", mockNewsItem.link);

		// 뉴스 요약이 올바르게 렌더링되었는지 확인
		const snippetElement = screen.getByText(mockNewsItem.contentSnippet);
		expect(snippetElement).toBeInTheDocument();

		// 날짜가 올바르게 포맷되었는지 확인
		const relativeDate = screen.getByText(/약 \d+일 전/i);
		expect(relativeDate).toBeInTheDocument();
	});

	test("handles invalid date string gracefully", () => {
		const invalidDateNewsItem = { ...mockNewsItem, pubDate: "invalid-date" };

		render(<NewsItem {...invalidDateNewsItem} />);

		// 날짜가 파싱 불가능한 경우에도 기본적인 렌더링이 되는지 확인
		const titleElement = screen.getByText(mockNewsItem.title);
		expect(titleElement).toBeInTheDocument();
		const snippetElement = screen.getByText(mockNewsItem.contentSnippet);
		expect(snippetElement).toBeInTheDocument();

		// 날짜가 파싱 불가능한 경우 상대적인 시간이 표시되지 않아야 함
		const relativeDate = screen.queryByText(/전/i);
		expect(relativeDate).not.toBeInTheDocument();
	});
});
