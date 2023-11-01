import { Test, TestingModule } from "@nestjs/testing";
import { ResponsesInterceptor } from "./responses.interceptor";
import { CallHandler } from "@nestjs/common";
import { of } from "rxjs";

describe("ResponsesInterceptor", () => {
  let interceptor: ResponsesInterceptor<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsesInterceptor],
    }).compile();

    interceptor = module.get<ResponsesInterceptor<any>>(ResponsesInterceptor);
  });

  it("should be defined", () => {
    expect(interceptor).toBeDefined();
  });

  describe("intercept", () => {
    let mockExecutionContext: any;
    let mockCallHandler: Partial<CallHandler>;

    beforeEach(() => {
      mockExecutionContext = {};
      mockCallHandler = {
        handle: jest.fn().mockReturnValue(of("test data")),
      };
    });

    it("should transform response correctly", (done) => {
      interceptor
        .intercept(mockExecutionContext, mockCallHandler as CallHandler)
        .subscribe((result) => {
          expect(result).toEqual({
            data: "test data",
            message: "Operation successful",
          });
          done();
        });
    });
  });
});
