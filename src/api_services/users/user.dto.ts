import { ObjectLiteral } from 'typeorm';
import { type UserModel } from './users.model';

export const userDto = (user: UserModel | ObjectLiteral) => {
  return {
    name: user.name,
    email: user.email,
  };
};
