import { Logger } from "@nestjs/common";
import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayInit,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
	MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
	namespace: "ws/v1",
	cors: { origin: "*" },
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	private logger: Logger = new Logger("WebSocketGateway");

	afterInit() {
		this.logger.log("웹소켓 서버 초기화 ✅");
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client Disconnected : ${client.id}`);
	}

	handleConnection(client: Socket) {
		this.logger.log(`Client Connected : ${client.id}`);
	}

	@SubscribeMessage("messageToServer")
	handleMessage(@MessageBody() data: string): string {
		console.log("Received message:", data);
		return data;
	}
}
