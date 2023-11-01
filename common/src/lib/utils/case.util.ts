import { Model } from 'sequelize-typescript';
import { CamelCaseObj, SnakeCaseObj } from '../types';

function snakeToCamel(string: string): string {
  return string.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
}

function camelToSnake(str: string): string {
  return str
    .replace(/[\w]([A-Z])/g, (m) => {
      return m[0] + '_' + m[1];
    })
    .toLowerCase();
}

function convertKeysToCamelCase<T>(
  obj: T
): CamelCaseObj<T> | T | Array<CamelCaseObj<T> | T> {
  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  }

  const newObj: CamelCaseObj<T> = {} as CamelCaseObj<T>;
  for (const [key, value] of Object.entries(obj)) {
    const newKey = snakeToCamel(key);
    newObj[newKey as keyof CamelCaseObj<T>] = convertKeysToCamelCase(value);
  }
  return newObj;
}

function convertKeysToSnakeCase<T>(
  obj: T
): SnakeCaseObj<T> | T | Array<SnakeCaseObj<T> | T> {
  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  }

  let objectToModify = obj;
  if (objectToModify instanceof Model) {
    objectToModify = objectToModify.get();
  }

  const newObj: SnakeCaseObj<T> = {} as SnakeCaseObj<T>;
  for (const [key, value] of Object.entries(objectToModify)) {
    const newKey = camelToSnake(key);
    newObj[newKey as keyof SnakeCaseObj<T>] = convertKeysToSnakeCase(value);
  }
  return newObj;
}

export {
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
  snakeToCamel,
  camelToSnake,
};
