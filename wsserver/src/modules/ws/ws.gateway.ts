import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
<<<<<<< HEAD
=======
	OnGatewayInit,
>>>>>>> dev
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ExternalWsService } from "./external-ws.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
<<<<<<< HEAD
@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
=======
@WebSocketGateway({
	cors: {
		origin: "ws://localhost:3000",
		methods: "GET,POST",
		credentials: true,
	},
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
>>>>>>> dev
	@WebSocketServer() server: Server;
	private clients: Map<string, Socket> = new Map();
	private readonly logger = new Logger(WsGateway.name);

<<<<<<< HEAD
	constructor(private externalWsService: ExternalWsService) {
		// 외부 WebSocket 메시지를 클라이언트로 전달
		this.externalWsService.onMessage((data) => {
			this.broadcastToClients("messageFromExternal", data);
		});
	}

=======
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

>>>>>>> dev
	handleConnection(client: Socket) {
		this.logger.log(`Client connected: ${client.id}`);
		this.clients.set(client.id, client);
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
		this.clients.delete(client.id);
	}
<<<<<<< HEAD

	@SubscribeMessage("messageToServer")
	handleMessage(client: Socket, payload: any): void {
		this.logger.log(`Received message from ${client.id}: ${payload}`);
		this.externalWsService.sendMessage(payload); // 외부 WebSocket 서버로 메시지 전달
	}

	broadcastToClients(event: string, message: any) {
		this.server.emit(event, message);
	}
=======
>>>>>>> dev
}
