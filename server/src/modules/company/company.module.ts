import { Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyInfo } from "../../entities/CompanyInfo.entity";
import { StockInfo } from "../../entities/StockInfo.entity";

@Module({
	imports: [TypeOrmModule.forFeature([CompanyInfo, StockInfo])],
	controllers: [CompanyController],
	providers: [CompanyService],
})
export class CompanyModule {}
