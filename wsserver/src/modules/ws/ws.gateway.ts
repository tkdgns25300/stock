import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ExternalWsService } from "./external-ws.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
@WebSocketGateway({
	cors: {
		origin: "ws://localhost:3000",
		methods: "GET,POST",
		credentials: true,
	},
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	private clients: Map<string, Socket> = new Map();
	private readonly logger = new Logger(WsGateway.name);

	afterInit() {
		this.logger.log("WebSocket Server Initialized ✅");
	}

	constructor(private externalWsService: ExternalWsService) {
		// KSI WebSocket Message to Clients
		this.externalWsService.onMessage((data) => {
			try {
				const parsedMessage = JSON.parse(data.toString());
				this.logger.log(` message from KSI WebSocket: ${JSON.stringify(parsedMessage)}`);
			} catch (error) {
				this.logger.error(`Error parsing KSI message: ${error}`);
			}

			this.broadcastToClients("messageFromKSI", data);
		});
	}

	@SubscribeMessage("messageToServer")
	handleMessage(client: Socket, payload: any): void {
		this.logger.log(`Received message from ${client.id}: ${payload}`);

		// Message to KSI Websocket Server
		this.externalWsService.sendMessage(payload.stockCode);
	}

	broadcastToClients(event: string, message: any) {
		this.server.emit(event, message);
	}

	handleConnection(client: Socket) {
		this.logger.log(`Client connected: ${client.id}`);
		this.clients.set(client.id, client);
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
		this.clients.delete(client.id);
	}
}
