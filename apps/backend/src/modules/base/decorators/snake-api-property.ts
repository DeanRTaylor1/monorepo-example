import { camelToSnake } from "@monorepo-example/common";
import { ApiProperty } from "@nestjs/swagger";

function SnakeApiProperty(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const snakeCaseName = camelToSnake(propertyKey.toString());
    ApiProperty({ name: snakeCaseName })(target, propertyKey);
  };
}

export { SnakeApiProperty };
