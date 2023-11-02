import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { ToSnake } from "@monorepo-example/common";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  getHealthStatus(): ToSnake<{ message: string }> {
    return this.appService.getHealth();
  }
}
