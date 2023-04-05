import React from "react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Logo from "./components/Logo";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<div>
				<Logo />
				<HomePage />
			</div>
		</BrowserRouter>
	);
};

export default App;
