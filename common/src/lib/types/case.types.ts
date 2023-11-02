/* eslint-disable @typescript-eslint/no-explicit-any */
//disabled for complex types
type ToCamel<S> = {
  [K in keyof S as K extends string ? CamelCase<K> : never]: S[K] extends
    | Date
    | Array<any>
    | any
    ? S[K]
    : S[K] extends object
    ? ToCamel<S[K]>
    : S[K];
};

type CamelCase<S extends string> = S extends `${infer T}_${infer U}${infer V}`
  ? `${Lowercase<T>}${Uppercase<U>}${CamelCase<V>}`
  : Lowercase<S>;

type ToSnake<S> = {
  [K in keyof S as K extends string ? SnakeCase<K> : never]: S[K] extends
    | Date
    | Array<any>
    | any
    ? S[K]
    : S[K] extends object
    ? ToSnake<S[K]>
    : S[K];
};

type SnakeCase<S extends string> = S extends `${infer P1}${infer P2}`
  ? P2 extends Uncapitalize<P2>
    ? `${Lowercase<P1>}${SnakeCase<P2>}`
    : `${Lowercase<P1>}_${Lowercase<SnakeCase<P2>>}`
  : S;

type RecursiveRecord = {
  [key: string]: Date | string | RecursiveRecord | Array<any> | any;
};

export { ToCamel, CamelCase, ToSnake, SnakeCase, RecursiveRecord };
