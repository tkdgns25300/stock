import React, { ReactNode } from "react";
import Search from "./Search";
import Logo from "./Logo";

interface LeftProps {
	children?: ReactNode;
}

const HomeLeft: React.FC<LeftProps> = ({ children }: LeftProps) => {
	return (
		<div>
			<Logo />
			<div className="bg-black w-1/2 h-screen flex flex-col justify-center items-center">
				<Search />
			</div>
		</div>
	);
};

export default HomeLeft;
