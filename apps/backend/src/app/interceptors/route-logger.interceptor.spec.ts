import { RouteLoggerInterceptor } from "./route-logger.interceptor";

describe("RouteLoggerInterceptor", () => {
  it("should be defined", () => {
    expect(new RouteLoggerInterceptor()).toBeDefined();
  });
});
