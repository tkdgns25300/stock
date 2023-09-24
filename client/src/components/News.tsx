import React, { useEffect, useState } from "react";
import { NewsData, NewsProps } from "./types/News/interface";

const News: React.FC<NewsProps> = ({ companyName }) => {
	const [articles, setArticles] = useState<NewsData[]>([]);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

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

				if (newsData.result.length === 0) {
					setHasMore(false);
				}

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
		setHasMore(true);
	}, [companyName]);

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<div>
			<h2>Latest News for {companyName}</h2>
			<ul>
				{articles.slice(0, page * 5).map((article, index) => (
					<li key={index}>
						<h3>
							<a href={article.link} target="_blank" rel="noopener noreferrer">
								{article.title}
							</a>
						</h3>
						<p>{article.contentSnippet}</p>
						<p>Published Date: {article.pubDate}</p>
					</li>
				))}
			</ul>
			{loading && <p>Loading...</p>}
			{!loading && hasMore && (
				<button onClick={handleLoadMore} disabled={loading}>
					Load More
				</button>
			)}
			{!loading && !hasMore && <p>No more news available</p>}
		</div>
	);
};

export default News;
