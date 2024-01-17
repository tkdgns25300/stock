import React from "react";
import InfoMessage from "./InfoMessage";

const HomeRight: React.FC = () => {
	return (
		<div className="bg-white text-black w-1/2 h-screen flex flex-col justify-center items-center">
			<InfoMessage
				title="About STOCKPEDIA."
				description={`Stockpedia는 상장 종목에 관련된 모든 정보를 제공합니다.<br /><br />
					최신 뉴스와 재무재표 및 차트 데이터까지, 주식 투자에 필요한 모든 데이터를 확인할 수 있습니다.`}
			/>
		</div>
	);
};

export default HomeRight;
