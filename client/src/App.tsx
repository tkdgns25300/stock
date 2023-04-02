import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";

const App: React.FC = () => {
	return (
		<div className="flex">
			<Left />
			<Right />
		</div>
	);
};

export default App;
