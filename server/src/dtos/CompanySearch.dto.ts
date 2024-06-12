import { IsOptional, IsString, Length } from "class-validator";

export class CompanySearchDto {
	@IsOptional()
	@IsString()
	@Length(1, 100)
	name?: string;

	@IsOptional()
	@IsString()
	@Length(1, 10)
	stockCode?: string;
}
