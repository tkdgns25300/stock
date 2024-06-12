import React from "react";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Description from "./Description";
import CompanyDetailTable from "./CompanyDetailTable";

interface CompanyData {
	address: string;
	capital: string;
	ceo: string;
	currency: string;
	description: string;
	detailed_name: string;
	english_name: string;
	fiscal_month: number;
	founded_date: string;
	id: number;
	industry_code: string;
	industry_name: string;
	main_phone: string;
	name: string;
	website: string;
}

interface CompanyInfoProps {
	companyData: CompanyData | null;
	stockCode: string | null;
	stockType: string | null;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyData, stockCode, stockType }) => {
	if (!companyData) {
		return null;
	}

	return (
		<div className="text-white font-doHyeon px-28">
			<div className="w-full">
				<Title name={companyData.name} stockCode={stockCode} stockType={stockType} />
				<SubTitle
					englishName={companyData.english_name}
					foundedDate={new Date(companyData.founded_date).toLocaleDateString()}
				/>
				<Description description={companyData.description} />
				<div className="border-b-2 border-white border-opacity-25 w-full mx-auto my-10"></div>
				<CompanyDetailTable companyData={companyData} />
			</div>
		</div>
	);
};

export default CompanyInfo;
