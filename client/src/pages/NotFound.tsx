import React from "react";
import NotFoundLeft from "../components/NotFoundLeft";
import NotFoundRight from "../components/NotFoundRight";
import Logo from "../components/Logo";

const NotFoundPage: React.FC = () => {
	return (
		<div>
			<Logo />
			<div className="flex">
				<NotFoundLeft />
				<NotFoundRight />
			</div>
		</div>
	);
};

export default NotFoundPage;
