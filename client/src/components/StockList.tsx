import React from "react";

export interface StockItemType {
	companyName: string;
	stockCode: string;
	stockType: string;
}

const StockItem: React.FC<StockItemType> = ({ companyName, stockCode, stockType }) => {
	return (
		<div className="flex justify-between">
			<div>
				<span className="text-gray-200 text-lg">{companyName}</span>
				<span className="text-gray-500"> {stockType}</span>
			</div>
			<div>
				<span className="text-gray-200">{stockCode}</span>
			</div>
		</div>
	);
};

export default StockItem;
