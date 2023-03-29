import React, { ReactNode } from "react";

interface RightComponentProps {
	children?: ReactNode;
}

const RightComponent: React.FC<RightComponentProps> = ({ children }: RightComponentProps) => {
	return (
		<div className="bg-white text-black w-1/2 h-screen flex flex-col">
			<div className="flex-grow">{children}</div>
		</div>
	);
};

export default RightComponent;
