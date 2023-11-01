import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { formatStatus, formatMethod } from "../../utils/format.utils";

@Injectable()
export class RouteLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        if (process.env.NODE_ENV !== "production") {
          const statusCode = context.switchToHttp().getResponse().statusCode;
          const formattedStatus = formatStatus(statusCode);
          const formattedMethod = formatMethod(method);
          const logMessage = `[NestJS] ${formattedStatus} | ${
            Date.now() - now
          } ms | ${request.ip} | ${formattedMethod} '${url}'`;
          Logger.log(logMessage);
        }
      })
    );
  }
}
