import { Test, TestingModule } from "@nestjs/testing";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { lastValueFrom, of } from "rxjs";
import { SnakeCaseInterceptor } from "./snakecase.interceptor";

jest.mock("@monorepo-example/common", () => ({
  convertKeysToSnakeCase: jest.fn((data) => {
    const result = {};
    for (const key in data) {
      result["snake_" + key] = data[key];
    }
    return result;
  }),
}));

describe("SnakeCaseInterceptor", () => {
  let interceptor: SnakeCaseInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnakeCaseInterceptor],
    }).compile();

    interceptor = module.get<SnakeCaseInterceptor>(SnakeCaseInterceptor);
  });

  it("should be defined", () => {
    expect(interceptor).toBeDefined();
  });

  it("should transform keys to snake case", async () => {
    const mockExecutionContext = {
      switchToHttp: jest.fn(),
    };
    const mockCallHandler: CallHandler = {
      handle: jest.fn().mockReturnValueOnce(of({ someKey: "someValue" })),
    };

    const observable = interceptor.intercept(
      mockExecutionContext as unknown as ExecutionContext,
      mockCallHandler
    );

    const data = await lastValueFrom(observable);
    expect(data).toEqual({ snake_someKey: "someValue" });
  });
});
