import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../config/config';
import { AppError } from './app.error';

const jwtOptions = {
  expiresIn: jwtExpiresIn,
};

export const verifyJWT = (
  token: string,
  secret: string
): Promise<string | JwtPayload | VerifyErrors> => {
  return new Promise((res, _rej) => {
    jwt.verify(token, secret, {}, (error, decoded) => {
      if (error) throw new AppError(error, 400);
      if (!decoded)
        throw new AppError(
          'No Se Pudo Recuperar La Información Del Token.',
          400
        );
      res(decoded);
    });
  });
};

export const generateJWT = (data: object): Promise<string | undefined> => {
  return new Promise((res, _rej) => {
    jwt.sign(data, jwtSecret || 'tokentest', jwtOptions, (error, token) => {
      if (error) throw new AppError(error, 400);
      if (!token) throw new AppError('No Se Genero El Token.', 400);
      res(token);
    });
  });
};
