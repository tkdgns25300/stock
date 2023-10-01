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
			<h2>Latest News for {companyName}</h2>
			<ul>
				{articles.slice(0, page * 5).map((article, index) => (
					<NewsItem
						key={index}
						title={article.title}
						link={article.link}
						pubDate={article.pubDate}
						content={article.content}
						contentSnippet={article.contentSnippet}
						guid={article.guid}
						isoDate={article.isoDate}
					/>
				))}
			</ul>
			{loading && <p>Loading...</p>}
			{!loading && (
				<button onClick={handleLoadMore} disabled={loading}>
					Load More
				</button>
			)}
		</div>
	);
};

export default News;
