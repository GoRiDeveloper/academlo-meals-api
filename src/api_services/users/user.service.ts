import { EntitySchema } from 'typeorm';
import type { UserModel } from './users.model';
import {
  UserLogin,
  UserStatus,
  //UpdateUser,
  sigInReturnType,
  UserRepository,
} from './types/user.types';
import { EntityService } from '../../services/entity.service';
import { FindResult } from '../../types/service.types';
import { hashPassword, comparePasswords } from './utils//bcrypt';
import { generateJWT } from '../../utils/jwt';
import { userDto } from './user.dto';
import { AppError } from '../../utils/app.error';

export class UserService {
  private userRepository: UserRepository;
  private entityService: EntityService;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.entityService = new EntityService(userRepository);
  }

  async findOneUser(
    filter: object,
    attributes: object | false,
    relationsAttributes: object | false,
    error: boolean
  ): Promise<FindResult> {
    return await this.entityService.findOne(
      filter,
      attributes,
      relationsAttributes,
      error
    );
  }

  async createUser(user: UserModel): Promise<FindResult> {
    user.password = await hashPassword(user.password);
    const userCreated = await this.entityService.create(user);
    return userDto(userCreated);
  }

  async signIn(data: UserLogin): Promise<sigInReturnType> {
    const { email, password } = data;
    const attributes = { id: true, name: true, email: true, password: true };
    const user = await this.findOneUser({ email }, attributes, false, true);

    const comparePass = comparePasswords(password, user?.password);
    const generateToken = generateJWT({ id: user?.id });

    const [, token] = await Promise.all([comparePass, generateToken]);

    return {
      token,
      user: userDto(user as UserModel),
    };
  }

  async updateUser(id: number, data: { id?: number }): Promise<FindResult> {
    data.id = id;
    return await this.entityService.updateOne(data as EntitySchema);
  }

  async disableUser(id: number): Promise<FindResult> {
    const user = await this.findOneUser(
      { id, status: UserStatus.available },
      false,
      false,
      true
    );

    if (!user) throw new AppError('Usuario No Encontrado.', 404);

    user.status = UserStatus.disabled;

    return await this.userRepository.save(user);
  }
}
