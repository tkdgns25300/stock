import React from "react";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Description from "./Description";

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
		<div className="text-white font-doHyeon">
			<Title name={companyData.name} stockCode={stockCode} stockType={stockType} />

			<SubTitle
				englishName={companyData.english_name}
				foundedDate={new Date(companyData.founded_date).toLocaleDateString()}
			></SubTitle>

			<Description description={companyData.description}></Description>

			<p>Detailed Name: {companyData.detailed_name}</p>
			<p>Address: {companyData.address}</p>
			<p>Capital: {companyData.capital}</p>
			<p>CEO: {companyData.ceo}</p>
			<p>Currency: {companyData.currency}</p>
			<p>Fiscal Month: {companyData.fiscal_month}</p>
			<p>Industry Code: {companyData.industry_code}</p>
			<p>Industry Name: {companyData.industry_name}</p>
			<p>Main Phone: {companyData.main_phone}</p>
			<p>Website: {companyData.website}</p>
		</div>
	);
};

export default CompanyInfo;
