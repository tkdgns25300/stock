import { Module } from "@nestjs/common";
import { EsgController } from './esg.controller';
import { EsgService } from './esg.service';

@Module({
  controllers: [EsgController],
  providers: [EsgService]
})
export class EsgModule {}
