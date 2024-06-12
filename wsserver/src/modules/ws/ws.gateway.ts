import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ExternalWsService } from "./external-ws.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	private clients: Map<string, Socket> = new Map();
	private readonly logger = new Logger(WsGateway.name);

	constructor(private externalWsService: ExternalWsService) {
		// 외부 WebSocket 메시지를 클라이언트로 전달
		this.externalWsService.onMessage((data) => {
			this.broadcastToClients("messageFromExternal", data);
		});
	}

	handleConnection(client: Socket) {
		this.logger.log(`Client connected: ${client.id}`);
		this.clients.set(client.id, client);
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
		this.clients.delete(client.id);
	}

	@SubscribeMessage("messageToServer")
	handleMessage(client: Socket, payload: any): void {
		this.logger.log(`Received message from ${client.id}: ${payload}`);
		this.externalWsService.sendMessage(payload); // 외부 WebSocket 서버로 메시지 전달
	}

	broadcastToClients(event: string, message: any) {
		this.server.emit(event, message);
	}
}
