import React, { useEffect, useState } from "react";
import io from "socket.io-client";

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
			const webSocket = io("http://localhost:8001/ws/v1", {
				withCredentials: true,
			});

			webSocket.on("connect", () => {
				console.log("Connected to WebSocket server");
			});

			webSocket.on("disconnect", () => {
				console.log("Disconnected from WebSocket server");
			});

			webSocket.on("error", (error) => {
				console.error("WebSocket error:", error);
			});

			webSocket.on("message", (message) => {
				console.log("WebSocket message:", message);
				if (message.event === "messageFromExternal" && message.data.stockCode === stockCode) {
					setPrice(message.data.price);
				}
			});

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
