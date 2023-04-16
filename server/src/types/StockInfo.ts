interface StockInfo {
	standard_code: string;
	stock_code: string;
	listing_date: Date;
	face_value: number | null;
	listed_shares: number;
	market_type: string;
	stock_type: string;
	affiliation: string | null;
	security_type: string;
}
