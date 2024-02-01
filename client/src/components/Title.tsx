import React from "react";

interface TitleProps {
	name: string | null;
	stockCode: string | null;
	stockType: string | null;
}

const Title: React.FC<TitleProps> = ({ name, stockCode, stockType }) => {
	return (
		<div className="flex items-center mt-6 mx-auto">
			<h1 className="2xl:text-9xl xl:text-8xl mobile:text-7xl text-6xl">{name}</h1>
			<div className="flex flex-col mx-5 xl:text-3xl desktop:text-2xl text-gray-400 font-gothic_a1 font-400">
				<p>{stockCode}</p>
				<p>{stockType}</p>
			</div>
		</div>
	);
};

export default Title;
