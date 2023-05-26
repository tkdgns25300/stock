import React from "react";

interface DescriptionProps {
	description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
	const splitSentence = (str: string) => {
		const normalizedStr = str.replace(/\u00A0/g, " ").split(". ");

		return normalizedStr.slice(0, normalizedStr.length - 1);
	};

	const descriptionSentences = splitSentence(description);

	return (
		<div className="mt-12 mb-20 font-doHyeon font-medium">
			{descriptionSentences.map((sentence: string, index: number) => (
				<span key={index} className="text-xl">
					{sentence.trim() + "."}
					<br />
					<br />
				</span>
			))}
			<span className="text-gray-400 float-right">출처 : 에프앤가이드</span>
		</div>
	);
};

export default Description;
