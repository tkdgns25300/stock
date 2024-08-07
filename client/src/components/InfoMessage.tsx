import React from "react";

interface InfoMessageProps {
	title: string;
	description: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ title, description }) => {
	return (
		<div className="text-center mx-24">
			<h1 className="xl:text-7xl mobile:text-6xl text-5xl font-Rubikfont-normal italic mb-12">{title}</h1>
			<p
				className="xl:text-xl desktop:text-lg tablet:text-base text-sm font-Nanum-Gothic font-semibold"
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		</div>
	);
};

export default InfoMessage;
