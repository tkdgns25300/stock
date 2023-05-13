import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import Logo from "./components/Logo";

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Logo />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/result" element={<ResultPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
