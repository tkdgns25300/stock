import React from "react";

interface CompanyTableData {
	address: string;
	capital: string;
	ceo: string;
	currency: string;
	detailed_name: string;
	fiscal_month: number;
	industry_code: string;
	industry_name: string;
	main_phone: string;
	website: string;
}

interface CompanyDetailTableProps {
	companyData: CompanyTableData;
}

const CompanyDetailTable: React.FC<CompanyDetailTableProps> = ({ companyData }) => {
	return (
		<div className="text-white">
			<h1 className="my-4 text-5xl">Detail</h1>
			<p className="my-2">한글명(상세): {companyData.detailed_name}</p>
			<p className="my-2">주소: {companyData.address}</p>
			<p className="my-2">자본금: {companyData.capital}</p>
			<p className="my-2">대표: {companyData.ceo}</p>
			<p className="my-2">통화구분: {companyData.currency}</p>
			<p className="my-2">결산월: {companyData.fiscal_month}</p>
			<p className="my-2">업종코드: {companyData.industry_code}</p>
			<p className="my-2">업종명: {companyData.industry_name}</p>
			<p className="my-2">대표번호: {companyData.main_phone}</p>
			<p className="my-2">
				웹사이트:{" "}
				<a href={companyData.website} target="_blank" rel="noopener noreferrer">
					{companyData.website}
				</a>{" "}
			</p>
		</div>
	);
};

export default CompanyDetailTable;