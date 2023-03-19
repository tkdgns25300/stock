import { Module } from "@nestjs/common";
import { CompanyModule } from "./company/company.module";
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [CompanyModule, UtilsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
