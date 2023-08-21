export interface ChartProps {
	stockCode: string;
}

export interface ChartDiagramData {
	name: string;
	date: string;
	open: number;
	close: number;
	high: number;
	low: number;
	volume: number;
}

export interface Query {
	fidCondMrktDivCode: string;
	fidInputIscd: string;
	fidInputDate1: string;
	fidInputDate2: string;
	fidPeriodDivCode: string;
	fidOrgAdjPrc: string;
}

export interface APIData {
	stckBsopDate: string;
	stckOprc: string;
	stckClpr: string;
	stckHgpr: string;
	stckLwpr: string;
	acmlVol: string;
}

export interface PriceInfoData {
	stckPrpr: number;
	prdyVrss: number;
	prdyVrssSign: number;
	stckHgpr: number;
	stckLwpr: number;
	w52Hgpr: number;
	w52Lwpr: number;
	htsAvls: number;
}

export interface RealTimePriceData {
	currentPrice: number;
	prdyVrss: number;
	prdyVrssSign: number;
}

export interface ChartDiagramProps {
	chartDiagramData: ChartDiagramData[];
	handlePeriodDivChange: (newPeriodDiv: any) => void;
}

export interface ChartRealTimePriceProps {
	stockCode: string;
	realTimePriceData: RealTimePriceData;
}

export interface ChartSummaryProps {
	priceInfoData: PriceInfoData;
}

export interface FinanceProps {
	stockCode: string;
}

export interface IncomeStatementData {
	stacYymm: string; // 결산년월
	saleAccount: string; // 매출액
	saleCost: string; // 매출원가
	saleTotlPrfi: string; // 매출총이익
	bsopPrti: string; // 영업이익
	opPrfi: string; // 경상이익
	specPrfi: string; // 특별이익
	specLoss: string; // 특별손실
	thtrNtin: string; // 당기순이익
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
	IncomeStatementData: IncomeStatementData[];
}

export interface BalanceSheetProps {
	BalanceSheetData: BalanceSheetData[];
}

export interface FinancialRatioProps {
	FinancialRatioData: FinancialRatioData[];
}

export interface ProfitRatioProps {
	ProfitRatioData: ProfitRatioData[];
}
