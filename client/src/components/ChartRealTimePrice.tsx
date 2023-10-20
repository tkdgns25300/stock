import React, { useEffect, useState } from "react";

<<<<<<< HEAD
interface ChartRealTimePriceProps {
	stockCode: string;
}

const ChartRealTimePrice: React.FC<ChartRealTimePriceProps> = ({ stockCode }) => {
	const [price, setPrice] = useState<string>("");

	// 현재 시세
	useEffect(() => {
		const fetchCurrentPrice = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/company/current-price/${stockCode}`);
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
	// useEffect(() => {
	// 	const subscribe = () => {
	// 		console.log("subscribe");
	// 		const header = {
	// 			approval_key: process.env.REACT_APP_WEB_SOCKET_APPROVAL_KEY,
	// 			custtype: "P",
	// 			tr_type: "1",
	// 			"content-type": "utf-8",
	// 		};

	// 		const body = {
	// 			input: {
	// 				tr_id: "H0STCNT0",
	// 				tr_key: stockCode,
	// 			},
	// 		};

	// 		webSocket.send(JSON.stringify({ header, body }));
	// 		webSocket.onmessage = async (event) => {
	// 			const response = await event.data.split("|");
	// 			console.log(response);
	// 			if (response.length === 4 && response[3].split("^")[0] === stockCode) {
	// 				// console.log("stock code :", response[3].split("^")[0]);
	// 				// console.log("cur price :", response[3].split("^")[2]);
	// 				// console.log(typeof response[3].split("^")[2]);
	// 				setPrice(response[3].split("^")[2]);
	// 			}
	// 		};
	// 	};

	// 	subscribe();
	// }, [stockCode]);

	if (price === "") {
		return <div>Loading...</div>;
	}

	return <div>{price}</div>;
};

export default ChartRealTimePrice;
=======
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
			<div className="m-2 text-7xl">₩{currentPrice}</div>
			<div
				className={`m-2 p-2 rounded-md text-3xl ${
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
>>>>>>> dev
