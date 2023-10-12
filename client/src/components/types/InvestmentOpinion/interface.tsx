export interface InvestmentOpinionProps {
	stockCode: string;
}

export interface InvestmentOpinionData {
	stckBsopDate: string; // 발표일
	invtOpnn: string; // 투자 의견
	invtOpnnClsCode: string; // 투자 의견 구분 코드
	mbcrName: string; // 증권사명
	htsGoalPrc: string; // 목표가
}

export interface InvestmentOpinionItemProps {
	stckBsopDate: string;
	invtOpnn: string;
	invtOpnnClsCode: string;
	mbcrName: string;
	htsGoalPrc: string;
}
