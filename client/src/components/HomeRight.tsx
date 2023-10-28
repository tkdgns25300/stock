import React from "react";
import InfoMessage from "./InfoMessage";

const HomeRight: React.FC = () => {
	return (
		<div className="bg-white text-black w-1/2 h-screen flex flex-col justify-center items-center">
			<InfoMessage
				title="기업 정보를 손쉽게 조회하기 위한 웹사이트입니다."
				description="기업명 혹은 종목코드로 검색해보세요.test"
			/>
		</div>
	);
};

export default HomeRight;
