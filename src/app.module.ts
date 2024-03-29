import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StockController } from "./stock/stock.controller";
import { StockService } from "./stock/stock.service";
import { StockModule } from "./stock/stock.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";
import { IndexModule } from "./index/index.module";
import { EtfModule } from "./etf/etf.module";
import { BondModule } from "./bond/bond.module";
import { DerivativesModule } from "./derivatives/derivatives.module";
import { GeneralProductModule } from "./general-product/general-product.module";
import { EsgModule } from "./esg/esg.module";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SpaceModule } from './space/space.module';

@Module({
	imports: [StockModule, IndexModule, EtfModule, BondModule, DerivativesModule, GeneralProductModule, EsgModule, AuthModule, UserModule, PostModule, SpaceModule],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		if (process.env.NODE_ENV === "development") {
			consumer.apply(LoggingMiddleware).forRoutes("*");
		}
	}
}
