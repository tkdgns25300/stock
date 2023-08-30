import React from "react";
import { BalanceSheetProps } from "./types/Chart/interface";

const BalanceSheet: React.FC<BalanceSheetProps> = ({ balanceSheetData }) => {
	return (
		<div className="w-full">
			<div className="text-3xl font-gothic-ai">대차대조표</div>
		</div>
	);
};

export default BalanceSheet;
