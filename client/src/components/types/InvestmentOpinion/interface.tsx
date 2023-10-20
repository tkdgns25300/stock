export interface InvestmentOpinionProps {
	stockCode: string;
}

export interface InvestmentOpinionData {
	stckBsopDate: string; // 발표일
	invtOpnn: string; // 투자 의견
	stckPrpr: string; // 현재가
	mbcrName: string; // 증권사명
	htsGoalPrc: string; // 목표가
}

export interface InvestmentOpinionItemProps {
	stckBsopDate: string;
	invtOpnn: string;
	stckPrpr: string;
	mbcrName: string;
	htsGoalPrc: string;
}
