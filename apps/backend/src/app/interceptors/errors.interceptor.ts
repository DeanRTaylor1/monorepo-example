import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HandleErrorsInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error);
        } else {
          this.logger.error(
            `Unhandled error: ${this.formatErrorMessage(error)}`
          );
          throw new HttpException(
            "Something went wrong.",
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      })
    );
  }
  private formatErrorMessage(error): string {
    return `name: ${error.name},  message: ${error.message}, errors: ${
      JSON.stringify(error?.errors) ?? ""
    }`;
  }
}
