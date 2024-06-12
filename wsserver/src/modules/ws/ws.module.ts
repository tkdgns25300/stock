import { Module } from "@nestjs/common";
import { WsGateway } from "./ws.gateway";
import { ExternalWsService } from "./external-ws.service";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Module({
	controllers: [],
	providers: [WsGateway, ExternalWsService],
})
export class WsModule {}
