import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import { StockModule } from './stock/stock.module';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [StockModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV === 'development') {
      consumer.apply(LoggingMiddleware).forRoutes('*');
    }
  }
}
