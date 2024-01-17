import React from "react";

interface InfoMessageProps {
	title: string;
	description: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ title, description }) => {
	return (
		<div className="text-center">
			<h1 className="text-3xl font-Rubik text-8xl font-normal italic mb-12">{title}</h1>
			<p className="text-2xl font-Nanum-Gothic font-semibold" dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
};

export default InfoMessage;
