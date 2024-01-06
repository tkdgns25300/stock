import React from "react";

interface SubTitleProps {
	englishName: string;
	foundedDate: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ englishName, foundedDate }) => {
	return (
		<div className="flex my-3 text-3xl">
			<span className="italic text-blue-600/75">{englishName}</span>
			<span className="italic ml-3 text-blue-600/75">({foundedDate}~)</span>
		</div>
	);
};

export default SubTitle;
