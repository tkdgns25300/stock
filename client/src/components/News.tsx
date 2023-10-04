import React, { useEffect, useState } from "react";
import { NewsData, NewsProps } from "./types/News/interface";
import NewsItem from "./NewsItem";

const News: React.FC<NewsProps> = ({ companyName }) => {
	const [articles, setArticles] = useState<NewsData[]>([]);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchNewsData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER_URI}/company/news/${companyName}?page=${page}&pageSize=5`,
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const newsData = await response.json();

				setArticles(newsData.result);
			} catch (error) {
				console.error("Error fetching news:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchNewsData();
	}, [companyName, page]);

	useEffect(() => {
		setArticles([]);
		setPage(1);
	}, [companyName]);

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20 font-gothic-a1">
			<ul>
				{articles.slice(0, page * 5).map((article, index) => (
					<React.Fragment key={index}>
						<NewsItem
							title={article.title}
							link={article.link}
							pubDate={article.pubDate}
							content={article.content}
							contentSnippet={article.contentSnippet}
							guid={article.guid}
							isoDate={article.isoDate}
						/>
						{index < articles.slice(0, page * 5).length - 1 && (
							<div className="border-b border-gray-300 w-full mx-auto my-4"></div>
						)}
					</React.Fragment>
				))}
			</ul>
			{loading && <p>Loading...</p>}
			{!loading && (
				<button
					onClick={handleLoadMore}
					disabled={loading}
					className="mt-4 py-2 px-4 font-bold rounded-md bg-gray-100 hover:bg-gray-300"
				>
					Load More
				</button>
			)}
		</div>
	);
};

export default News;
