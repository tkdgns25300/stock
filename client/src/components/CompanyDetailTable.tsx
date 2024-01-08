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
		<div className="relative mt-24 shadow-xl w-auto text-black" style={{ borderRadius: "2rem" }}>
			<div className="absolute bg-green -top-14 bg-green-600 p-12 pt-4 rounded-3xl text-2xl font-doHyeon z-10">
				Detail
			</div>
			<div className="w-full bg-slate-100 relative rounded-3xl border-current p-6 z-20">
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
		</div>
	);
};

export default CompanyDetailTable;
