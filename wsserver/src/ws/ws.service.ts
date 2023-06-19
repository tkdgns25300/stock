import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import WebSocket from 'ws';

@Injectable()
@WebSocketGateway()
export class WsService {
  @WebSocketServer() server: Server;
  private connectedKSIWebSocket: boolean = false;
  private externalWebSocket: WebSocket;
  private logger: Logger = new Logger(WsService.name); // Logger 인스턴스를 생성합니다.

  connectWebSocket() {
    try {
      if (!this.connectedKSIWebSocket) {
        this.externalWebSocket = new WebSocket(
          `${process.env.KIS_WEBSOCKET_SERVER_URL}`,
        );

        this.externalWebSocket.on('open', () => {
          this.logger.log('Connected to external WebSocket server');
        });

        // this.externalWebSocket.on("message", (data) => {
        // 	this.logger.log(data);
        // 	this.server.emit("messageToClient", data);
        // });
        this.connectedKSIWebSocket = true;
      } else {
        this.logger.log('Already connected to external WebSocket server');
      }
    } catch (error) {
      this.logger.error(
        `Failed to connect to external WebSocket server: ${error.message}`,
      );
    }
  }
}
