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
	}, []);

	// 실시간 시세
	useEffect(() => {
		const connectWebSocket = () => {
			const webSocket = new WebSocket("ws://ops.koreainvestment.com:31000/tryitout/H0STCNT0");

			webSocket.onopen = () => {
				const header = {
					approval_key: process.env.REACT_APP_WEB_SOCKET_APPROVAL_KEY,
					custtype: "P",
					tr_type: "1",
					"content-type": "utf-8",
				};

				const body = {
					input: {
						tr_id: "H0STCNT0",
						tr_key: stockCode,
					},
				};

				webSocket.send(JSON.stringify({ header, body }));
			};

			webSocket.onmessage = async (event) => {
				console.log(event.data);
				const response = await event.data.split("|");
				if (response.length === 4 && response[3].split("^")[0] === stockCode) {
					// console.log("stock code :", response[3].split("^")[0]);
					// console.log("cur price :", response[3].split("^")[2]);
					// console.log(typeof response[3].split("^")[2]);
					setPrice(response[3].split("^")[2]);
				}
			};

			// 웹소켓 연결은 React앱이 구동중인 이상 계속 유지되어야 하므로 주석처리, 이와 마찬가지로 구독하는 종목도 해제 로직 작성 필요 없음.
			// webSocket.onclose = () => {
			// 	// Handle WebSocket close event
			// };

			return () => {
				webSocket.close();
			};
		};

		connectWebSocket();
	}, [stockCode]);

	if (price === "") {
		return <div>Loading...</div>;
	}

	return <div>{price}</div>;
};

export default ChartRealTimePrice;