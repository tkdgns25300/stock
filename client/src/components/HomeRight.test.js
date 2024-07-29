import React from "react";
import { render, screen } from "@testing-library/react";
import HomeRight from "./HomeRight";
import InfoMessage from "./InfoMessage";

// Mock the InfoMessage component
jest.mock("./InfoMessage", () => (props) => (
	<div>
		<h1>{props.title}</h1>
		<div dangerouslySetInnerHTML={{ __html: props.description }} />
	</div>
));

test("renders HomeRight component with InfoMessage", () => {
	render(<HomeRight />);

	// Check if the InfoMessage component is rendered with correct props
	expect(screen.getByText("About STOCKPEDIA.")).toBeInTheDocument();
	expect(
		screen.getByText("Stockpedia는 한국 시장(KOSPI/KOSDAQ/NONEX)에 상장된 모든 종목에 대한 종합 정보를 제공합니다."),
	).toBeInTheDocument();
	expect(
		screen.getByText(
			"최신 뉴스와 재무재표 및 차트 데이터까지, 주식 투자에 필요한 모든 정보를 손쉽게 확인할 수 있습니다.",
		),
	).toBeInTheDocument();
	expect(screen.getByText("회사명이나 종목코드를 입력하여 관심 종목을 검색해 보세요.")).toBeInTheDocument();

	// Check if HomeRight has the correct styling
	const container = screen.getByText("About STOCKPEDIA.").closest("div");
	expect(container).toHaveClass("w-screen");
	expect(container).toHaveClass("desktop:w-1/2");
	expect(container).toHaveClass("h-screen");
	expect(container).toHaveClass("bg-white");
	expect(container).toHaveClass("text-black");
	expect(container).toHaveClass("flex");
	expect(container).toHaveClass("flex-col");
	expect(container).toHaveClass("justify-center");
	expect(container).toHaveClass("items-center");
});
