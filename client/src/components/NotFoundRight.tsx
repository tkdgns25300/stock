import React from "react";
import InfoMessage from "./InfoMessage";

const NotFoundRight: React.FC = () => {
	return (
		<div className="bg-white text-black w-1/2 h-screen flex flex-col justify-center items-center">
			<InfoMessage title="이 페이지는 존재하지 않습니다." description="올바른 URL을 입력하였는지 확인해주세요." />
		</div>
	);
};

export default NotFoundRight;
