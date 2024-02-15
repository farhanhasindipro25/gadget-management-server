/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  id: string;
  email: string;
  password: string;
};

export type IUserMethods = {
  doesUserExist(email: string): Promise<Partial<IUser> | null>;
  doPasswordsMatch(
    givenPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
