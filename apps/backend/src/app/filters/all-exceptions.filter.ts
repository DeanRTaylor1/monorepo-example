import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { env } from "../modules/config/env";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : "Something went wrong";

    const simplifiedMessage =
      typeof message === "object"
        ? (message as HttpException).message
        : message;

    const errorResponse = {
      code: status,
      message: simplifiedMessage,
      path: request.url,
      method: request.method,
    };

    if (env.isDev) {
      errorResponse["timestamp"] = new Date().toISOString();
      errorResponse["stack"] = exception["stack"];
    }

    response.status(status).json(errorResponse);
  }
}
