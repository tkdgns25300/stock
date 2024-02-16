import React from "react";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";
import Logo from "../components/Logo";

const HomePage: React.FC = () => {
	return (
		<div>
			<Logo />
			<div className="desktop:flex">
				<HomeLeft />
				<HomeRight />
			</div>
		</div>
	);
};

export default HomePage;
