import { Module } from "@nestjs/common";
import { UtilsController } from "./utils.controller";
import { UtilsService } from "./utils.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockInfo } from "src/entities/StockInfo.entity";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";

@Module({
	imports: [TypeOrmModule.forFeature([CompanyInfo, StockInfo])],
	controllers: [UtilsController],
	providers: [UtilsService],
})
export class UtilsModule {}
