import React from "react";
import FinancialRatio from "./FinancialRatio";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";

const Finance: React.FC = () => {
	return (
		<div className="w-full flex bg-white relative rounded-3xl p-6 z-20">
			<BalanceSheet />
			<IncomeStatement />
			<FinancialRatio />
		</div>
	);
};

export default Finance;
