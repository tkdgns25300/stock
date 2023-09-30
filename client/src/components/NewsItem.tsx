import React from "react";
import { NewsItemProps } from "./types/News/interface";

const NewsItem: React.FC<NewsItemProps> = ({ title, link, pubDate, content, contentSnippet, guid, isoDate, image }) => {
	return (
		<li>
			<h3>
				<a href={link} target="_blank" rel="noopener noreferrer">
					{title}
				</a>
			</h3>
			{image && <img src={image} alt={title} style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }} />}
			<p>{contentSnippet}</p>
			<p>Published Date: {pubDate}</p>
			<p>{content}</p>
			<p>GUID: {guid}</p>
			<p>ISO Date: {isoDate}</p>
			<div className="border-b border-gray-300 w-full mx-auto my-4"></div>
		</li>
	);
};

export default NewsItem;
