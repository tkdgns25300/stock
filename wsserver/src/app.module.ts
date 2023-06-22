import { Module } from '@nestjs/common';
import { WsModule } from './modules/ws/ws.module';

@Module({
  imports: [WsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
