import React, { ReactNode } from "react";
import Search from "./Search";

interface LeftProps {
	children?: ReactNode;
}

const Left: React.FC<LeftProps> = ({ children }: LeftProps) => {
	return (
		<div className="bg-black w-1/2 h-screen flex flex-col justify-center items-center">
			<Search />
		</div>
	);
};

export default Left;
