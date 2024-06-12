import React from "react";

interface InfoMessageProps {
	title: string;
	description: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ title, description }) => {
	return (
		<div className="text-center">
			<h1 className="text-3xl font-bold mb-4">{title}</h1>
			<p className="text-lg">{description}</p>
		</div>
	);
};

export default InfoMessage;
