import { SnakeCaseObj, convertKeysToSnakeCase } from '@monorepo-example/common';

class SnakeCaseDTO<T> {
  private originalObject: T;

  constructor(obj: T) {
    this.originalObject = obj;
  }

  toSnakeCase(): SnakeCaseObj<T> {
    return convertKeysToSnakeCase(this.originalObject) as SnakeCaseObj<T>;
  }
}

export { SnakeCaseDTO };
