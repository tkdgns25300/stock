import React from "react";

interface SubTitleProps {
	englishName: string;
	foundedDate: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ englishName, foundedDate }) => {
	return (
		<div className="flex my-1 2xl:text-3xl large:text-2xl">
			<span className="italic text-green-600">{englishName}</span>
			<span className="italic ml-3 text-green-600">({foundedDate}~)</span>
		</div>
	);
};

export default SubTitle;
