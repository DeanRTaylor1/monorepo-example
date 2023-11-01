// config.module.ts
import { Module, Global } from "@nestjs/common";
import { env } from "./env";

@Global()
@Module({
  providers: [
    {
      provide: "AppConfig",
      useValue: env,
    },
  ],
  exports: ["AppConfig"],
})
export class ConfigModule {}
