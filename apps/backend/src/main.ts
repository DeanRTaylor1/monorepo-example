import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";
import { TerminalEscapeCodes } from "@monorepo-example/common";
import { AllExceptionsFilter } from "./app/filters/all-exceptions.filter";

class NestApp {
  private app: INestApplication;
  public port: string | number = process.env.PORT || 3000;
  private readonly globalPrefix = "api";

  constructor() {
    this.bootstrap();
  }

  private async bootstrap() {
    this.app = await NestFactory.create(AppModule);

    this.registerMiddleware();
    this.registerFilters();
    this.serveSwagger();
    this.listen();
  }

  private registerFilters() {
    this.app.useGlobalFilters(new AllExceptionsFilter());
  }

  private registerMiddleware() {
    this.app.enableCors();
    this.app.useGlobalPipes(new ValidationPipe());
    this.app.setGlobalPrefix(this.globalPrefix);
  }
  //test
  private serveSwagger() {
    const config = new DocumentBuilder()
      .setTitle("Monorepo Example")
      .setDescription("A starter for a monorepo with at least one nestjs api")
      .setVersion("1.0")
      .addTag("nx-monorepo-backend")
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(`${this.globalPrefix}/docs`, this.app, document);
  }

  private async listen() {
    await this.app.listen(this.port);
    const art = `
    ██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝
    ██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝ 
    ██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  
    ██║  ██║███████╗██║  ██║██████╔╝   ██║   
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝
  `;
    Logger.log(`${art}`);
    Logger.log(
      "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    );
    Logger.log(
      `         ${TerminalEscapeCodes.FgWhite}${TerminalEscapeCodes.BgGreen}🚀 Application is running on: http://localhost:${this.port}/${this.globalPrefix}.${TerminalEscapeCodes.Reset}`
    );
    Logger.log("");
    Logger.log(
      "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    );
  }
}

new NestApp();
