import React from "react";

interface SubTitleProps {
	englishName: string;
	foundedDate: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ englishName, foundedDate }) => {
	return (
		<div className="flex my-5 text-2xl">
			<span className="italic text-green-800/75">{englishName}</span>
			{/* <span className="mx-7 font-gothic_a1 font-semibold text-gray-400">/</span> */}
			<span className="italic text-green-800/75 ml-3">({foundedDate}~)</span>
		</div>
	);
};

export default SubTitle;
