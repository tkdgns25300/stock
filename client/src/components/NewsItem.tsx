import React from "react";
import { NewsItemProps } from "./types/News/interface";

const NewsItem: React.FC<NewsItemProps> = ({ title, link, pubDate, content, contentSnippet, guid, isoDate }) => {
	return (
		<li className="mb-4 p-4 bg-gray-100 rounded-md">
			<h3 className="font-bold text-lg mb-2">
				<a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
					{title}
				</a>
			</h3>
			<p className="text-gray-700 mb-2">{contentSnippet}</p>
			<p className="text-gray-500 text-sm">Published Date: {pubDate}</p>
			<div className="border-b border-gray-300 w-full mx-auto my-4"></div>
		</li>
	);
};

export default NewsItem;
