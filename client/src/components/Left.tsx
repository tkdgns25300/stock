import React, { ReactNode } from "react";

interface LeftProps {
	children?: ReactNode;
}

const Left: React.FC<LeftProps> = ({ children }: LeftProps) => {
	return <div className="bg-black w-1/2 h-screen">{children}</div>;
};

export default Left;
