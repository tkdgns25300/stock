import React, { useEffect, useState } from "react";

import { ChartRealTimePriceProps } from "./types/Chart/interface";

const ChartRealTimePrice: React.FC<ChartRealTimePriceProps> = ({ stockCode, realTimePriceData }) => {
	const [currentPrice, setCurrentPrice] = useState<number>(realTimePriceData.currentPrice);

	useEffect(() => {
		setCurrentPrice(realTimePriceData.currentPrice);
	}, [realTimePriceData.currentPrice]);

	const ytdPrice = currentPrice - realTimePriceData.prdyVrss;
	const compareToYtdPercent = (realTimePriceData.prdyVrss / ytdPrice) * 100;

	return (
		<div className="w-auto flex justify-center items-end my-5 font-doHyeon">
			<div className="3xl:text-7xl 2xl:text-6xl desktop:text-5xl mobile:text-6xl text-5xl m-2">₩{currentPrice}</div>
			<div
				className={`3xl:text-3xl 2xl:text-2xl desktop:text-xl mobile:text-2xl text-xl m-2 p-2 rounded-md ${
					realTimePriceData.prdyVrssSign === 3
						? "bg-gray-300 text-gray-700"
						: realTimePriceData.prdyVrssSign > 3
						? "bg-blue-300 text-blue-700"
						: "bg-red-300 text-red-700"
				}`}
			>
				{compareToYtdPercent.toFixed(2)}%
			</div>
		</div>
	);
};

export default ChartRealTimePrice;

/*
// import io from "socket.io-client";

// useEffect(() => {
// 	const webSocket = io(`${process.env.REACT_APP_WEBSOCKET_SERVER_WS_URI}`, {
// 		withCredentials: true,
// 		transports: ["websocket"],
// 	});

// 	webSocket.on("connect", () => {
// 		console.log("Connected to WebSocket server");
// 		webSocket.emit("messageToServer", { stockCode });
// 	});

// 	webSocket.on("disconnect", () => {
// 		console.log("Disconnected from WebSocket server");
// 	});

// 	webSocket.on("connect_error", (error) => {
// 		console.error("WebSocket connect error:", error);
// 	});

// 	webSocket.on("error", (error) => {
// 		console.error("WebSocket error:", error);
// 	});

// 	webSocket.on("message", (message) => {
// 		console.log("WebSocket message:", message);
// 		if (message.event === "messageFromKSI" && message.data.stockCode === stockCode) {
// 			setCurrentPrice(message.data.price);
// 		}
// 	});

// 	return () => {
// 		if (webSocket.connected) {
// 			webSocket.close();
// 		}
// 	};
// }, [stockCode, setCurrentPrice]);
 */
