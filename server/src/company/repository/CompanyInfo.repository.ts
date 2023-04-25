import { Repository } from "typeorm";
import { CompanyInfo } from "../entities/CompanyInfo.entity";
import { CustomRepository } from "src/database/typeorm-ex.decorator";

@CustomRepository(CompanyInfo)
export class CompanyInfoRepository extends Repository<CompanyInfo> {}
