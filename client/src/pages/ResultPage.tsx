import React from "react";
import ResultLeft from "../components/ResultLeft";
import ResultRight from "../components/ResultRight";

const ResultPage: React.FC = () => {
	return (
		<div className="flex">
			<ResultLeft />
			<ResultRight />
		</div>
	);
};

export default ResultPage;
