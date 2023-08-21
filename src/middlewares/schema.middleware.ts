import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catch.async';

export const schemaValidation = (schema: AnyZodObject) => {
  return catchAsync(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | any> => {
      const results = await schema.safeParseAsync({
        body: req.body,
        params: req.params,
        headers: req.headers,
      });

      if (!results.success) {
        const errors = results.error.issues.map((issue) => {
          return {
            code: issue.code,
            path: issue.path,
            message: issue.message,
          };
        });

        return res.status(400).json({
          status: 'error',
          errors,
        });
      }

      next();
    }
  );
};
