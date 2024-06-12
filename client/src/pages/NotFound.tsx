import React from "react";
import NotFoundLeft from "../components/NotFoundLeft";
import NotFoundRight from "../components/NotFoundRight";

const NotFoundPage: React.FC = () => {
	return (
		<div className="flex">
			<NotFoundLeft />
			<NotFoundRight />
		</div>
	);
};

export default NotFoundPage;
