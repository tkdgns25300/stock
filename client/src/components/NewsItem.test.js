import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsItem from "./NewsItem";
import { NewsItemProps } from "./types/News/interface";

const mockNewsItem = {
	title: "Sample News Article",
	link: "http://example.com/news-article",
	pubDate: "2024-08-24T12:34:56Z",
	contentSnippet: "This is a sample snippet for the news article.",
};

describe("NewsItem Component", () => {});
