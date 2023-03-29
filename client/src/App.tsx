import React from "react";
import LeftComponent from "./components/LeftComponent";
import RightComponent from "./components/RightComponent";

const App: React.FC = () => {
	return (
		<div className="flex">
			<LeftComponent>
				<h2>Left Component Title</h2>
				<p>Left Component Content</p>
			</LeftComponent>
			<RightComponent>
				<h2>Right Component Title</h2>
				<p>Right Component Content</p>
			</RightComponent>
		</div>
	);
};

export default App;
