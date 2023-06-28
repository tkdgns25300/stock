// external-ws.service.ts
import { Injectable, Logger } from "@nestjs/common";
import WebSocket from "ws";

@Injectable()
export class ExternalWsService {
	private externalWebSocket: WebSocket;
	private connectedKSIWebSocket = false;
	private readonly logger = new Logger(ExternalWsService.name);

	constructor() {
		this.connectKSIWebSocket();
	}

	private connectKSIWebSocket() {
		if (this.connectedKSIWebSocket) {
			this.logger.log("Already connected to KSI WebSocket server");
			return;
		}

		try {
			this.externalWebSocket = new WebSocket(`${process.env.KIS_WEBSOCKET_SERVER_URL}`);

			this.externalWebSocket.on("open", () => {
				this.logger.log("Connected to KSI WebSocket server");
				this.connectedKSIWebSocket = true;
			});

			this.externalWebSocket.on("message", (data) => {
				this.logger.log(`Received message from KSI WebSocket: ${data}`);
				// 여기에 클라이언트에게 메시지를 전달하는 로직을 추가할 수 있습니다.
			});

			this.externalWebSocket.on("close", () => {
				this.logger.log("Disconnected from KSI WebSocket server");
				this.connectedKSIWebSocket = false;
				setTimeout(() => this.connectKSIWebSocket(), 5000); // 재연결 시도
			});

			this.externalWebSocket.on("error", (error) => {
				this.logger.error("Error with KSI WebSocket connection:", error);
			});
		} catch (error) {
			this.logger.error(`Failed to connect to KSI WebSocket server: ${error.message}`);
		}
	}

	sendMessage(message: any) {
		if (this.externalWebSocket && this.externalWebSocket.readyState === WebSocket.OPEN) {
			this.externalWebSocket.send(JSON.stringify(message));
		} else {
			this.logger.warn("Cannot send message, WebSocket is not open");
		}
	}

	onMessage(callback: (data: any) => void) {
		if (this.externalWebSocket) {
			this.externalWebSocket.on("message", callback);
		} else {
			this.logger.error("WebSocket is not initialized");
		}
	}
}
