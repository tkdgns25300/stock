import React from "react";
import Search from "./Search";

const HomeLeft: React.FC = () => {
	return (
		<div className="bg-black w-1/2 h-screen flex flex-col justify-center items-center">
			<Search />
		</div>
	);
};

export default HomeLeft;
