import React, { useEffect, useState } from "react";
import CompanyInfo from "./CompanyInfo";

interface ResultLeftProps {
	companyName: string | null;
	stockCode: string | null;
}

const ResultLeft: React.FC<ResultLeftProps> = ({ companyName, stockCode }) => {
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
			<CompanyInfo companyData={companyData} />
		</div>
	);
};

export default ResultLeft;
