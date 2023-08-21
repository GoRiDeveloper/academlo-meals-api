import bcrypt from 'bcryptjs';
import { salt } from '../../../config/config';
import { AppError } from '../../../utils/app.error';

export const hashPassword = async (pass: string): Promise<string> => {
  const saltToHash = await bcrypt.genSalt(salt);
  return await bcrypt.hash(pass, saltToHash);
};

export const comparePasswords = async (
  pass?: string,
  hashPass?: string
): Promise<undefined> => {
  if (!pass || !hashPass)
    throw new AppError('Las Contraseñas Son Requeridas.', 400);

  const isCorrect = await bcrypt.compare(pass, hashPass);

  if (!isCorrect) throw new AppError('Contraseña Incorrecta.', 400);
};
