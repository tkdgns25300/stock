import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundLeft from "./NotFoundLeft";

test("renders 404 error message and navigates to home", () => {
	render(
		<Router>
			<NotFoundLeft />
		</Router>,
	);

	// Check if the 404 error message is rendered
	expect(screen.getByText(/404 Error/i)).toBeInTheDocument();

	// Check if the descriptive text is rendered
	expect(screen.getByText(/Oops! The page you are looking for does not exist./i)).toBeInTheDocument();
	expect(
		screen.getByText(/It might have been moved or deleted. Please check the URL or return to the home page./i),
	).toBeInTheDocument();

	// Check if the "Go to Home" link is rendered
	const homeLink = screen.getByText(/Go to Home/i);
	expect(homeLink).toBeInTheDocument();

	// Simulate a click on the "Go to Home" link
	fireEvent.click(homeLink);

	// Check if the URL has changed (this will require a history object if using react-router version < 6)
	expect(window.location.pathname).toBe("/");
});
