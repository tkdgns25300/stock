import React from "react";
import InfoMessage from "./InfoMessage";

const HomeRight: React.FC = () => {
	return (
		<div className="bg-white text-black w-1/2 h-screen flex flex-col justify-center items-center">
			<InfoMessage
				title="About STOCKPEDIA."
				description={`Stockpedia는 한국 시장(KOSPI/KOSDAQ/NONEX)에 상장된 모든 종목에 대한 종합 정보를 제공합니다.<br /><br />
					최신 뉴스와 재무재표 및 차트 데이터까지, 주식 투자에 필요한 모든 정보를 손쉽게 확인할 수 있습니다.<br /><br />
					회사명이나 종목코드를 입력하여 관심 종목을 검색해 보세요.`}
			/>
		</div>
	);
};

export default HomeRight;
