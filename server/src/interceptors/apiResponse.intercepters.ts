import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "src/dtos/ApiResponse.dto";

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map(({ result, message = "요청이 성공적으로 완료되었습니다.", code = HttpStatus.OK }) => {
				return new ApiResponse(result, message, code);
			}),
		);
	}
}
