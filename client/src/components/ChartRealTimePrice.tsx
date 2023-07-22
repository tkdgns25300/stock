import React, { useEffect } from "react";
import io from "socket.io-client";
import { ChartRealTimePriceProps } from "./types/Chart/interface";

const ChartRealTimePrice: React.FC<ChartRealTimePriceProps> = ({ stockCode, currentPrice, setCurrentPrice }) => {
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
				setCurrentPrice(message.data.price);
			}
		});

		return () => {
			if (webSocket.connected) {
				webSocket.close();
			}
		};
	}, [stockCode, setCurrentPrice]);

	if (currentPrice === "") {
		return <div>Loading...</div>;
	}

	return <div>{currentPrice}</div>;
};

export default ChartRealTimePrice;
