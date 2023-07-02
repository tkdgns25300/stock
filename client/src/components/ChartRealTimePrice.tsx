import React, { useEffect, useState } from "react";

interface ChartRealTimePriceProps {
	stockCode: string;
}

const ChartRealTimePrice: React.FC<ChartRealTimePriceProps> = ({ stockCode }) => {
	const [price, setPrice] = useState<string>("");

	// 현재 시세
	useEffect(() => {
		const fetchCurrentPrice = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_SERVER_URI}/company/current-price/${stockCode}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setPrice(data.result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchCurrentPrice();
	}, [stockCode]);

	// 실시간 시세
	useEffect(() => {
		const connectWebSocket = () => {
			// Backend WebSocket 서버 URL
			const webSocket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_SERVER_URI}`);

			webSocket.onopen = () => {
				console.log("Connected to WebSocket server");

				// 서버로 메시지 전송
				webSocket.send(JSON.stringify({ event: "subscribe", data: stockCode }));
			};

			webSocket.onmessage = (event) => {
				const message = JSON.parse(event.data);
				if (message.event === "messageFromExternal" && message.data.stockCode === stockCode) {
					setPrice(message.data.price);
				}
			};

			webSocket.onclose = () => {
				console.log("Disconnected from WebSocket server");
			};

			webSocket.onerror = (error) => {
				console.error("WebSocket error:", error);
			};

			return () => {
				webSocket.close();
			};
		};

		const cleanupWebSocket = connectWebSocket();

		return cleanupWebSocket;
	}, [stockCode]);

	if (price === "") {
		return <div>Loading...</div>;
	}

	return <div>{price}</div>;
};

export default ChartRealTimePrice;
