import React from "react";
import { IncomeStatementQuartlyProps } from "./types/Chart/interface";

const IncomeStatementQuartly: React.FC<IncomeStatementQuartlyProps> = ({ IncomeStatementQuartlyData }) => {
	return (
		<div className="w-full">
			<div>결산년월 : {IncomeStatementQuartlyData.stacYymm}</div>
			<div>매출액 : {IncomeStatementQuartlyData.saleAccount}</div>
			<div>매출원가 : {IncomeStatementQuartlyData.saleCost}</div>
			<div>매출총이익 : {IncomeStatementQuartlyData.saleTotlPrfi}</div>
			<div>영업이익 : {IncomeStatementQuartlyData.bsopPrti}</div>
			<div>경상이익 : {IncomeStatementQuartlyData.opPrfi}</div>
			<div>특별이익 : {IncomeStatementQuartlyData.specPrfi}</div>
			<div>특별손실 : {IncomeStatementQuartlyData.specLoss}</div>
			<div>당기순이익 : {IncomeStatementQuartlyData.thtrNtin}</div>
		</div>
	);
};

export default IncomeStatementQuartly;
