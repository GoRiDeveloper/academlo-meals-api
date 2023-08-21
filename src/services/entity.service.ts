import { EntitySchema, ObjectLiteral } from 'typeorm';
import {
  RepositoryType,
  FindResults,
  FindResult,
} from '../types/service.types';
import { AppError } from '../utils/app.error';

export class EntityService {
  private entitieRepository: RepositoryType;

  constructor(repository: RepositoryType) {
    this.entitieRepository = repository;
  }

  async findAll(
    filters: object,
    attributes: object | false,
    relationsAttributes: object | false
  ): Promise<FindResults> {
    return await this.entitieRepository.findAndCount({
      where: filters,
      ...(attributes && { select: attributes }),
      ...(relationsAttributes && { relations: relationsAttributes }),
    });
  }

  async findOne(
    filters: object,
    attributes: object | false,
    relationsAttributes: object | false,
    error: boolean
  ): Promise<FindResult> {
    const entity = await this.entitieRepository.findOne({
      where: filters,
      ...(attributes && { select: attributes }),
      ...(relationsAttributes && { relations: relationsAttributes }),
    });

    if (!entity && error) throw new AppError('No Se Encontró El Recurso.', 404);

    return entity;
  }

  async create(data: object): Promise<ObjectLiteral> {
    const created = this.entitieRepository.create(data);
    return await this.entitieRepository.save(created, { listeners: false });
  }

  async updateOne(data: EntitySchema): Promise<FindResult> {
    return await this.entitieRepository.save(data, { listeners: false });
  }
}
