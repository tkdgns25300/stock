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
