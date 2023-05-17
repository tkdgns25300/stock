import React from "react";

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
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyData }) => {
	if (!companyData) {
		return null;
	}

	return (
		<div className="text-white">
			<h1>{companyData.name}</h1>
			<h2>{companyData.detailed_name}</h2>
			<p>{companyData.description}</p>
			<p>Address: {companyData.address}</p>
			<p>Capital: {companyData.capital}</p>
			<p>CEO: {companyData.ceo}</p>
			<p>Currency: {companyData.currency}</p>
			<p>English Name: {companyData.english_name}</p>
			<p>Fiscal Month: {companyData.fiscal_month}</p>
			<p>Founded Date: {companyData.founded_date}</p>
			<p>ID: {companyData.id}</p>
			<p>Industry Code: {companyData.industry_code}</p>
			<p>Industry Name: {companyData.industry_name}</p>
			<p>Main Phone: {companyData.main_phone}</p>
			<p>Website: {companyData.website}</p>
		</div>
	);
};

export default CompanyInfo;
