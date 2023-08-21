import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dbConfig } from '../../config/config';

export const AppDataSrc = new DataSource(dbConfig);
