import React, { ReactNode } from "react";
import SearchComponent from "./Search";

interface LeftProps {
	children?: ReactNode;
}

const Left: React.FC<LeftProps> = ({ children }: LeftProps) => {
	return (
		<div className="bg-black text-white w-1/2 h-screen flex flex-col">
			<SearchComponent />
			<div className="flex-grow">{children}</div>
		</div>
	);
};

export default Left;
