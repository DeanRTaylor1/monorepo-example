import { ToSnake, convertKeysToSnakeCase } from "@monorepo-example/common";

class SnakeCaseDTO<T> {
  private originalObject: T;

  constructor(obj: T) {
    this.originalObject = obj;
  }

  toSnakeCase(): ToSnake<T> {
    return convertKeysToSnakeCase(this.originalObject) as ToSnake<T>;
  }
}

export { SnakeCaseDTO };
