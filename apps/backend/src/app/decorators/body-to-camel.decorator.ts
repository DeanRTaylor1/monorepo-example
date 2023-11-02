import { convertKeysToCamelCase } from "@monorepo-example/common";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const BodyToCamelCase = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const convertedBody = convertKeysToCamelCase(body);
    return convertedBody;
  }
);
