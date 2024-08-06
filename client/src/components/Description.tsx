import React from "react";

interface DescriptionProps {
	description: string | null;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
	const splitSentence = (str: string) => {
		// 기본 문구가 아닌 경우에만 분할하도록 수정
		if (!str) return [str];
		console.log(str);
		const normalizedStr = str.replace(/\u00A0/g, " ").split(". ");
		return normalizedStr.slice(0, normalizedStr.length - 1);
	};

	// 기본 문구
	const defaultMessage = "현재 해당 회사의 상세 설명이 업데이트 되지 않았습니다.\u00A0";

	// description이 null이면 기본 문구를 사용
	const descriptionText = description && description.trim() !== "" ? description : defaultMessage;
	const descriptionSentences = splitSentence(descriptionText);

	return (
		<div className="mt-4 font-doHyeon font-medium">
			{descriptionSentences.length > 0 ? (
				descriptionSentences.map((sentence: string, index: number) => (
					<span key={index} className="2xl:text-xl large:text-lg">
						{sentence.trim() + "."}
						<br />
						<br />
					</span>
				))
			) : (
				<span className="2xl:text-xl large:text-lg">{descriptionText}</span>
			)}
			<span className="text-gray-400 float-right">출처 : 에프앤가이드</span>
		</div>
	);
};

export default Description;
