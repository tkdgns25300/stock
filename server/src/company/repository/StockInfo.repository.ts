import { Repository } from "typeorm";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { StockInfo } from "../entities/StockInfo.entity";

@CustomRepository(StockInfo)
export class StockInfoRepository extends Repository<StockInfo> {}
