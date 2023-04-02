import React, { useState } from "react";

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			// API 요청을 보내는 부분은 임시로 작성
			fetch(`https://your-api-uri?q=${searchTerm}`)
				.then((response) => response.json())
				.then((data) => {
					// 검색 결과 처리 로직
					console.log(data);
				})
				.catch((error) => {
					console.error("Error fetching data:", error);
				});
		}
	};

	return (
		<div className="w-1/2 bg-white bg-opacity-10 p-3 rounded-full flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-10 h-6 text-gray-200" // SVG 아이콘 크기 및 색상 설정
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
			<input
				type="text"
				placeholder="회사명/종목 코드를 입력해주세요"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleSearch}
				className="flex-1 py-2 px-4 rounded-full bg-transparent border-none text-gray-200 placeholder-gray-400 focus:outline-none"
			/>
		</div>
	);
};

export default Search;
