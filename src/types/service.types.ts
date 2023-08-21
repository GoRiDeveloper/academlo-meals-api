import { Repository, ObjectLiteral } from 'typeorm';

export type RepositoryType = Repository<ObjectLiteral>;
export type FindResults = [ObjectLiteral[], number];
export type FindResult = ObjectLiteral | null;
