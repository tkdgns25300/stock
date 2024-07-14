import React from "react";
import { render, screen } from "@testing-library/react";
import NotFoundRight from "./NotFoundRight";
import InfoMessage from "./InfoMessage";

test("renders InfoMessage with correct title and description", () => {
	render(<NotFoundRight />);

	expect(screen.getByText(/이 페이지는 존재하지 않습니다./i)).toBeInTheDocument();
	expect(screen.getByText(/올바른 URL을 입력하였는지 확인해주세요./i)).toBeInTheDocument();
});
