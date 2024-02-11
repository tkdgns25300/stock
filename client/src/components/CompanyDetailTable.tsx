import React, { useEffect, useState } from "react";

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
	const [maxHeight, setMaxHeight] = useState("350px");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 3840) {
				setMaxHeight("500px");
			} else if (window.innerWidth >= 2560) {
				setMaxHeight("400px");
			} else if (window.innerWidth >= 1920) {
				setMaxHeight("350px");
			} else if (window.innerWidth >= 1024) {
				setMaxHeight("250px");
			} else {
				setMaxHeight("400px");
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<div
			className="2xl:w-3/4 w-full flex justify-center relative mt-20 shadow-xl text-black"
			style={{ borderRadius: "2rem" }}
		>
			<div className="w-full">
				<div className="2xl:text-2xl large:text-xl absolute bg-green -top-14 bg-green-600 p-12 pt-4 rounded-3xl font-doHyeon z-10">
					Detail
				</div>
				<div
					className="2xl:text-lg large:text-base bg-slate-100 relative rounded-3xl border-current p-6 z-20"
					style={{
						maxHeight: maxHeight,
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
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">주소 :</span>
						<span className="text-right">{companyData.address}</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">대표 :</span>
						<span className="text-right">{companyData.ceo}</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">대표번호 :</span>
						<span className="text-right">{companyData.main_phone}</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">웹사이트:</span>
						<span className="text-right">
							<a className="underline" href={companyData.website} target="_blank" rel="noopener noreferrer">
								{companyData.website}
							</a>
						</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">자본금 :</span>
						<span className="text-right">{companyData.capital}</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">통화구분 :</span>
						<span className="text-right">{companyData.currency}</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">결산월 :</span>
						<span className="text-right">{companyData.fiscal_month}</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
					<p className="flex justify-between items-center my-2">
						<span className="text-left">업종코드 :</span>
						<span className="text-right">{companyData.industry_code}</span>
					</p>
					<div className="3xl:my-4 2xl:my-3 large:my-2 desktop:my-1 my-3 border-b border-gray w-full mx-auto"></div>
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
