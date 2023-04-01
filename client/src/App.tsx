import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import Search from "./components/Search";

const App: React.FC = () => {
	return (
		<div className="flex">
			<Left>
				<Search />
			</Left>
			<Right>
				<h2>Right Component Title</h2>
				<p>Right Component Content</p>
			</Right>
		</div>
	);
};

export default App;
