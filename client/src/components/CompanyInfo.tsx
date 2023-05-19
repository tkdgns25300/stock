import React from "react";
import Title from "./Title";

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

	const splitSentence = (str: string) => {
		const normalizedStr = str.replace(/\u00A0/g, " ");
		const sentences = normalizedStr.split(". ");
		return sentences;
	};

	const descriptionSentences = splitSentence(companyData.description);

	return (
		<div className="text-white font-doHyeon">
			<Title name={companyData.name} stockCode={stockCode} stockType={stockType} />

			<p>
				{companyData.english_name} / {new Date(companyData.founded_date).toLocaleDateString()}
			</p>

			{descriptionSentences.map((sentence, index) => (
				<p key={index}>
					{sentence.trim() + "."}
					<br />
					<br />
				</p>
			))}

			<p>{companyData.detailed_name}</p>
			<p>Address: {companyData.address}</p>
			<p>Capital: {companyData.capital}</p>
			<p>CEO: {companyData.ceo}</p>
			<p>Currency: {companyData.currency}</p>
			<p>Fiscal Month: {companyData.fiscal_month}</p>

			<p>ID: {companyData.id}</p>
			<p>Industry Code: {companyData.industry_code}</p>
			<p>Industry Name: {companyData.industry_name}</p>
			<p>Main Phone: {companyData.main_phone}</p>
			<p>Website: {companyData.website}</p>
		</div>
	);
};

export default CompanyInfo;
