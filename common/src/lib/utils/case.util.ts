import { Model } from "sequelize-typescript";
import { ToCamel, ToSnake } from "../types";
import { Sanitized, TaintedFieldsSet } from "./tainted.util";

function snakeToCamel(string: string): string {
  return string.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
}

function camelToSnake(str: string): string {
  return str
    .replace(/[\w]([A-Z])/g, (m) => {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}

function convertKeysToCamelCase<T>(
  obj: T
): ToCamel<T> | T | Array<ToCamel<T> | T> {
  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  }

  const newObj: ToCamel<T> = {} as ToCamel<T>;
  for (const [key, value] of Object.entries(obj)) {
    const newKey = snakeToCamel(key);

    newObj[newKey as keyof ToCamel<T>] = convertKeysToCamelCase(value);
  }
  return newObj;
}

function convertKeysToSnakeCase<T>(
  obj: T
): Sanitized<ToSnake<T>> | T | Array<Sanitized<ToSnake<T>> | T> {
  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  }

  let objectToModify = obj;
  if (objectToModify instanceof Model) {
    objectToModify = objectToModify.get();
  }

  const newObj: Sanitized<ToSnake<T>> = {} as Sanitized<ToSnake<T>>;
  for (const [key, value] of Object.entries(objectToModify)) {
    const newKey = camelToSnake(key);

    if (TaintedFieldsSet.has(newKey) || TaintedFieldsSet.has(key)) {
      continue;
    }

    newObj[newKey as keyof Sanitized<ToSnake<T>>] =
      convertKeysToSnakeCase(value);
  }
  return newObj;
}

export {
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
  snakeToCamel,
  camelToSnake,
};
