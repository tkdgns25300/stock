import React, { useEffect, useState } from "react";
import CompanyInfo from "./CompanyInfo";
import Search from "./Search";
import Logo from "./Logo";

interface ResultLeftProps {
	companyName: string;
	stockCode: string;
	stockType: string;
}

const ResultLeft: React.FC<ResultLeftProps> = ({ companyName, stockCode, stockType }) => {
	const [companyData, setCompanyData] = useState<any>(null);

	useEffect(() => {
		const fetchCompanyData = async () => {
			try {
				const encodedCompanyName = encodeURIComponent(companyName);
				const apiUrl = `${process.env.REACT_APP_API_SERVER_URI}/company/search?name=${encodedCompanyName}`;

				const response = await fetch(apiUrl);
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
		<div className="relative w-screen desktop:w-1/2 h-screen bg-black overflow-y-auto">
			<Logo />
			<div className="flex flex-col justify-start items-center mt-6">
				<div className="w-full mt-24">
					<Search />
				</div>
				<div className="w-full mt-8">
					<CompanyInfo companyData={companyData} stockCode={stockCode} stockType={stockType} />
				</div>
			</div>
		</div>
	);
};

export default ResultLeft;
