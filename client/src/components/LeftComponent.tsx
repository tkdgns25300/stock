import React, { ReactNode } from "react";
import SearchComponent from "./SearchComponent";

interface LeftComponentProps {
	children?: ReactNode;
}

const LeftComponent: React.FC<LeftComponentProps> = ({ children }: LeftComponentProps) => {
	return (
		<div className="bg-black text-white w-1/2 h-screen flex flex-col">
			<SearchComponent />
			<div className="flex-grow">{children}</div>
		</div>
	);
};

export default LeftComponent;
