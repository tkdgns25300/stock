import React, { useState } from "react";

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearch = () => {
		// 추후 실시간 자동완성 기능을 구현할 예정
		// 현재는 검색 버튼을 누를 때만 동작
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
	};

	return (
		<div>
			<div className="bg-gray-500 p-4 rounded-lg flex items-center">
				<input
					type="text"
					placeholder="회사명/종목 코드를 입력해주세요"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-64 py-2 px-4 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none"
				/>
				<button
					onClick={handleSearch}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg border-t border-b border-r border-gray-200"
				>
					<img src="search-icon.png" alt="Search" />
				</button>
			</div>
		</div>
	);
};

export default Search;
