import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";

const App: React.FC = () => {
	return (
		<div className="flex">
			<Left>
				<h2>Left Component Title</h2>
				<p>Left Component Content</p>
			</Left>
			<Right>
				<h2>Right Component Title</h2>
				<p>Right Component Content</p>
			</Right>
		</div>
	);
};

export default App;
