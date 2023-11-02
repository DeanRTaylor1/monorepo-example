import { Test, TestingModule } from "@nestjs/testing";
import { AllExceptionsFilter } from "./all-exceptions.filter";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ArgumentsHost } from "@nestjs/common/interfaces/features/arguments-host.interface";

describe("AllExceptionsFilter", () => {
  let filter: AllExceptionsFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionsFilter],
    }).compile();

    filter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  it("should be defined", () => {
    expect(filter).toBeDefined();
  });

  describe("catch", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockArgumentsHost: Partial<ArgumentsHost>;

    beforeEach(() => {
      mockRequest = {
        url: "/test",
        method: "GET",
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockArgumentsHost = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
          getResponse: jest.fn().mockReturnValue(mockResponse),
        }),
      };
    });

    it("should handle HttpException correctly", () => {
      const exception = new HttpException("Test Error", HttpStatus.BAD_REQUEST);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: HttpStatus.BAD_REQUEST,
        path: "/test",
        method: "GET",
        message: "Test Error",
      });
    });

    it("should handle generic exceptions correctly", () => {
      const exception = new Error("Generic Error");
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        path: "/test",
        method: "GET",
        message: "Something went wrong",
      });
    });
  });
});
