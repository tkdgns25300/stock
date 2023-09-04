import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import { StockModule } from './stock/stock.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { IndexModule } from './index/index.module';
import { EtfModule } from './etf/etf.module';
import { BondModule } from './bond/bond.module';
import { DerivativesModule } from './derivatives/derivatives.module';

@Module({
  imports: [StockModule, IndexModule, EtfModule, BondModule, DerivativesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV === 'development') {
      consumer.apply(LoggingMiddleware).forRoutes('*');
    }
  }
}
