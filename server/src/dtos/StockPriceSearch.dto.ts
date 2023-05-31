import { IsNotEmpty, IsString } from "class-validator";

export class ChartDataQueryDto {
	@IsNotEmpty()
	@IsString()
	fidCondMrktDivCode: string;

	@IsNotEmpty()
	@IsString()
	fidInputIscd: string;

	@IsNotEmpty()
	@IsString()
	fidInputDate1: string;

	@IsNotEmpty()
	@IsString()
	fidInputDate2: string;

	@IsNotEmpty()
	@IsString()
	fidPeriodDivCode: string;

	@IsNotEmpty()
	@IsString()
	fidOrgAdjPrc: string;
}
