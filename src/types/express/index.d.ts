import express from 'express';
import type { ObjectLiteral } from 'typeorm';

declare global {
  namespace Express {
    interface Request {
      user?: UserModel | null;
      sessionUser?: ObjectLiteral | null;
    }
  }
}
