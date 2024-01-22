import React from "react";
import Search from "./Search";

const HomeLeft: React.FC = () => {
	return (
		<div className="w-screen desktop:w-1/2 h-screen bg-black flex flex-col justify-center items-center">
			<Search />
		</div>
	);
};

export default HomeLeft;
