import { Repository } from 'typeorm';
import { ReviewModel } from '../reviews.model';

export enum ReviewStatus {
  avaible = 'avaible',
  deleted = 'deleted',
}

export type ReviewRepository = Repository<ReviewModel>;
