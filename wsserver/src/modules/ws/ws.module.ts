import { Module } from "@nestjs/common";
import { ExternalWsService } from "./external-ws.service";
import { WsGateway } from "./ws.gateway";

@Module({
	providers: [WsGateway, ExternalWsService],
})
export class WsModule {}
