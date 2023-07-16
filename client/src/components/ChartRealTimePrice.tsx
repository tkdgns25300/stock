import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ChartRealTimePriceProps } from "./types/Chart/interface";

const ChartRealTimePrice: React.FC<ChartRealTimePriceProps> = ({ stockCode }) => {
	const [price, setPrice] = useState<string>("");

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

	useEffect(() => {
		const webSocket = io(`${process.env.REACT_APP_WEBSOCKET_SERVER_WS_URI}`, {
			withCredentials: true,
			transports: ["websocket"],
		});

		webSocket.on("connect", () => {
			console.log("Connected to WebSocket server");
			webSocket.emit("messageToServer", { stockCode });
		});

		webSocket.on("disconnect", () => {
			console.log("Disconnected from WebSocket server");
		});

		webSocket.on("connect_error", (error) => {
			console.error("WebSocket connect error:", error);
		});

		webSocket.on("error", (error) => {
			console.error("WebSocket error:", error);
		});

		webSocket.on("message", (message) => {
			console.log("WebSocket message:", message);
			if (message.event === "messageFromKSI" && message.data.stockCode === stockCode) {
				setPrice(message.data.price);
			}
		});

		return () => {
			if (webSocket.connected) {
				webSocket.close();
			}
		};
	}, [stockCode]);

	if (price === "") {
		return <div>Loading...</div>;
	}

	return <div>{price}</div>;
};

export default ChartRealTimePrice;
