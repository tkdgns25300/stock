import React, { useState } from "react";
import FinancialRatio from "./FinancialRatio";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";

const Finance: React.FC = () => {
	const [showIncomeStatement, setShowIncomeStatement] = useState(false);
	const [showBalanceSheet, setShowBalanceSheet] = useState(false);
	const [showFinancialRatio, setShowFinancialRatio] = useState(false);

	return (
		<div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20">
			<div>
				<button
					className="flex justify-between w-full py-2 focus:outline-none"
					onClick={() => setShowIncomeStatement(!showIncomeStatement)}
				>
					<span>손익계산서</span>
					<span
						className={`transform transition-transform duration-300 ${showIncomeStatement ? "rotate-180" : "rotate-0"}`}
					>
						▼
					</span>
				</button>
				<div
					className={`transition-max-height duration-500 ease-in-out-quint overflow-hidden ${
						showIncomeStatement ? "max-h-screen" : "max-h-0"
					}`}
				>
					{showIncomeStatement && <IncomeStatement />}
				</div>
			</div>

			<div>
				<button
					className="flex justify-between w-full py-2 focus:outline-none"
					onClick={() => setShowBalanceSheet(!showBalanceSheet)}
				>
					<span>대차대조표</span>
					<span
						className={`transform transition-transform duration-300 ${showBalanceSheet ? "rotate-180" : "rotate-0"}`}
					>
						▼
					</span>
				</button>
				<div
					className={`transition-max-height duration-500 ease-in-out-quint overflow-hidden ${
						showBalanceSheet ? "max-h-screen" : "max-h-0"
					}`}
				>
					{showBalanceSheet && <BalanceSheet />}
				</div>
			</div>

			<div>
				<button
					className="flex justify-between w-full py-2 focus:outline-none"
					onClick={() => setShowFinancialRatio(!showFinancialRatio)}
				>
					<span>현금 흐름</span>
					<span
						className={`transform transition-transform duration-300 ${showFinancialRatio ? "rotate-180" : "rotate-0"}`}
					>
						▼
					</span>
				</button>
				<div
					className={`transition-max-height duration-500 ease-in-out-quint overflow-hidden ${
						showFinancialRatio ? "max-h-screen" : "max-h-0"
					}`}
				>
					{showFinancialRatio && <FinancialRatio />}
				</div>
			</div>
		</div>
	);
};

export default Finance;
