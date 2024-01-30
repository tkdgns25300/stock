import React from "react";
import { useLocation } from "react-router-dom";
import ResultLeft from "../components/ResultLeft";
import ResultRight from "../components/ResultRight";

const ResultPage: React.FC = () => {
	const location = useLocation();
	const companyName = new URLSearchParams(location.search).get("companyName") || "";
	const stockCode = new URLSearchParams(location.search).get("stockCode") || "";
	const stockType = new URLSearchParams(location.search).get("stockType") || "";

	return (
		<div className="desktop:flex">
			<ResultLeft companyName={companyName} stockCode={stockCode} stockType={stockType} />
			<ResultRight companyName={companyName} stockCode={stockCode} stockType={stockType} />
		</div>
	);
};

export default ResultPage;
