import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFound";

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/result" element={<ResultPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
