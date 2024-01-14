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
		<div className="w-full flex justify-center relative mt-24 shadow-xl text-black" style={{ borderRadius: "2rem" }}>
			<div className="w-full">
				<div className="absolute bg-green -top-14 bg-green-600 p-12 pt-4 rounded-3xl text-2xl font-doHyeon z-10">
					Detail
				</div>
				<div
					className="bg-slate-100 relative rounded-3xl border-current text-lg p-6 z-20"
					style={{
						maxHeight: "450px",
						overflowY: "auto",
						scrollbarWidth: "thin" /* Firefox */,
						WebkitOverflowScrolling: "touch",
						scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)" /* Safari and Chrome */,
					}}
				>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">한글명(상세) :</span>
						<span className="text-right">{companyData.detailed_name}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">주소 :</span>
						<span className="text-right">{companyData.address}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">대표 :</span>
						<span className="text-right">{companyData.ceo}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">대표번호 :</span>
						<span className="text-right">{companyData.main_phone}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">웹사이트:</span>
						<span className="text-right">
							<a className="underline" href={companyData.website} target="_blank" rel="noopener noreferrer">
								{companyData.website}
							</a>
						</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">자본금 :</span>
						<span className="text-right">{companyData.capital}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">통화구분 :</span>
						<span className="text-right">{companyData.currency}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">결산월 :</span>
						<span className="text-right">{companyData.fiscal_month}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">업종코드 :</span>
						<span className="text-right">{companyData.industry_code}</span>
					</p>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">업종명 :</span>
						<span className="text-right">{companyData.industry_name}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CompanyDetailTable;
