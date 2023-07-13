import { Injectable, Logger } from "@nestjs/common";
import WebSocket from "ws";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

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

			this.externalWebSocket.on("close", () => {
				this.logger.log("Disconnected from KSI WebSocket server");
				this.connectedKSIWebSocket = false;
				setTimeout(() => this.connectKSIWebSocket(), 5000);
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
			const header = {
				approval_key: "fb73e061-2c57-48e7-96b5-80f65b7dd5a1",
				custtype: "P",
				tr_type: "1",
				"content-type": "utf-8",
			};
			const body = {
				input: {
					tr_id: "H0IFCNT0",
					tr_key: message,
				},
			};

			this.externalWebSocket.send(JSON.stringify({ header, body }));
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
