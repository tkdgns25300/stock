import { Controller } from "@nestjs/common";
import { WsService } from "./ws.service";

@Controller("ws")
export class WsController {
	constructor(private wsService: WsService) {}
}
