import React from "react";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";

const LandingPage: React.FC = () => {
	return (
		<div className="flex">
			<HomeLeft />
			<HomeRight />
		</div>
	);
};

export default LandingPage;
