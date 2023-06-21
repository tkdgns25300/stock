import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { WsService } from './ws.service';

@Controller('ws')
export class WsController implements OnModuleInit {
  constructor(private wsService: WsService) {}

  onModuleInit() {
    this.wsService.connectWebSocket(); // onModuleInit에서 웹소켓 연결 초기화
  }

  // WebSocket 연결
  @Get('connect')
  connectWebSocket() {
    this.wsService.connectWebSocket();
  }
}
