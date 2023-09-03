export interface FinanceProps {
	stockCode: string;
}

export interface IncomeStatementData {
	stacYymm: string; // 결산년월
	saleAccount: number; // 매출액
	saleCost: number; // 매출원가
	saleTotlPrfi: number; // 매출총이익
	bsopPrti: number; // 영업이익
	opPrfi: number; // 경상이익
	specPrfi: number; // 특별이익
	specLoss: number; // 특별손실
	thtrNtin: number; // 당기순이익
}

export interface BalanceSheetData {
	stacYymm: string; // 결산년월
	totalAset: string; // 자산총계
	totalLblt: string; // 부채총계
	totalCptl: string; // 자본총계
	cras: string; // 유동자산
	fxas: string; // 고정자산
	flow_lblt: string; // 유동부채
	fix_lblt: string; // 고정부채
	cpfn: string; // 자본금
}

export interface FinancialRatioData {
	stacYymm: string; // 결산년월
	grs: string; // 매출액 증가율
	bsopPrfiInrt: string; // 영업이익 증가율
	ntinInrt: string; // 순이익 증가율
	roeVal: string; // ROE 값
	eps: string; // EPS
	sps: string; // 주당매출액
	bps: string; // BPS
	rsrvRate: string; // 유보비율
	lbltRate: string; // 부채비율
}

export interface ProfitRatioData {
	stacYymm: string; // 결산년월
	cptlNtinRate: string; // 총자본 순이익율
	selfCptlNtinInrt: string; // 자기자본 순이익율
	saleNtinRate: string; // 매출액 순이익율
	saleTotlRate: string; // 매출액 총이익율
}

export interface IncomeStatementProps {
	incomeStatementData: IncomeStatementData[];
}

export interface IncomeStatementQuartlyProps {
	curIncomeStatementData: IncomeStatementData;
	previousIncomeStatementData: IncomeStatementData;
}

export interface BalanceSheetProps {
	balanceSheetData: BalanceSheetData[];
}

export interface FinancialRatioProps {
	financialRatioData: FinancialRatioData[];
}

export interface ProfitRatioProps {
	profitRatioData: ProfitRatioData[];
}
