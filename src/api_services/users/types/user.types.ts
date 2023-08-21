import type { Repository } from 'typeorm';
import type { email } from '../../../types/global.types';
import type { UserModel } from '../users.model';
import type { FindResult } from '../../../types/service.types';

export enum UserStatus {
  available = 'available',
  disabled = 'disabled',
}

export enum UserRole {
  normal = 'normal',
  admin = 'admin',
}

export type UserLogin = {
  readonly email: email;
  readonly password: string;
};

export type UpdateUser = {
  name?: string;
  email?: email;
};

export type sigInReturnType = {
  token: string | undefined;
  user: FindResult | null;
};

export type UserRepository = Repository<UserModel>;
