import React, { useEffect, useState } from "react";
import CompanyInfo from "./CompanyInfo";
import Search from "./Search";

interface ResultLeftProps {
	companyName: string | null;
	stockCode: string | null;
	stockType: string | null;
}

const ResultLeft: React.FC<ResultLeftProps> = ({ companyName, stockCode, stockType }) => {
	const [companyData, setCompanyData] = useState<any>(null);

	useEffect(() => {
		const fetchCompanyData = async () => {
			try {
				const response = await fetch(`http://localhost:8000/api/v1/company/search?name=${companyName}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setCompanyData(data.result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		if (companyName) {
			fetchCompanyData();
		}
	}, [companyName]);

	return (
		<div className="bg-black w-1/2 h-screen flex flex-col justify-center items-center">
			<Search />
			<div className="flex-grow flex flex-col justify-center items-center">
				<CompanyInfo companyData={companyData} stockCode={stockCode} stockType={stockType} />
			</div>
		</div>
	);
};

export default ResultLeft;
