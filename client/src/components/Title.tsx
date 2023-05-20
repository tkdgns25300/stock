import React from "react";

interface TitleProps {
	name: string | null;
	stockCode: string | null;
	stockType: string | null;
}

const Title: React.FC<TitleProps> = ({ name, stockCode, stockType }) => {
	return (
		<div className="flex items-center my-5">
			<h1 className="text-8xl">{name}</h1>
			<div className="flex flex-col mx-5 text-2xl text-gray-400 font-gothic_a1 font-400">
				<p>{stockCode}</p>
				<p>{stockType}</p>
			</div>
		</div>
	);
};

export default Title;
