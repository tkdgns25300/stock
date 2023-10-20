import { Module } from "@nestjs/common";
<<<<<<< HEAD
import { WsGateway } from "./ws.gateway";
import { ExternalWsService } from "./external-ws.service";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Module({
	controllers: [],
=======
import { ExternalWsService } from "./external-ws.service";
import { WsGateway } from "./ws.gateway";

@Module({
>>>>>>> dev
	providers: [WsGateway, ExternalWsService],
})
export class WsModule {}
