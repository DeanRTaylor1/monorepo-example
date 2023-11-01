import { Model } from 'sequelize-typescript';

type OmitSystemFields<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

type ExcludeSequelizeModel<T> = Omit<T, keyof Model>;

type ICreateAttributes<T> = OmitSystemFields<ExcludeSequelizeModel<T>>;

export { ICreateAttributes };
