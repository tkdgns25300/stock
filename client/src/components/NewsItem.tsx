import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { NewsItemProps } from "./types/News/interface";

// 날짜를 올바른 형식으로 변환하는 함수
const parseDate = (dateString: string) => {
	const parsedDate = Date.parse(dateString);
	if (!isNaN(parsedDate)) {
		return new Date(parsedDate).toISOString();
	}
	// 파싱 실패 시 원래 문자열 반환 (필요에 따라 예외 처리 가능)
	return dateString;
};

const NewsItem: React.FC<NewsItemProps> = ({ title, link, pubDate, contentSnippet }) => {
	const relativePubDate = formatDistanceToNow(parseISO(parseDate(pubDate)), { addSuffix: true, locale: ko });

	return (
		<li className="mb-4 px-4 py-7 bg-gray-100 rounded-md flex ">
			<div className="flex-grow">
				<h3 className="font-bold text-lg mb-2">
					<a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
						{title}
					</a>
				</h3>
				<p className="text-gray-700 mb-2">{contentSnippet}</p>
				<p className="text-gray-500 text-sm">{relativePubDate}</p>
			</div>
		</li>
	);
};

export default NewsItem;
