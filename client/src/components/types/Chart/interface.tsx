export interface ChartProps {
	stockCode: string;
}

export interface ChartData {
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

export interface ChartDiagramProps {
	chartData: ChartData[];
	handlePeriodDivChange: (newPeriodDiv: any) => void;
}

export interface ChartRealTimePriceProps {
	stockCode: string;
}
