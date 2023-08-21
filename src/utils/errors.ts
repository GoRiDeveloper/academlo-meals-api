import { AppError } from './app.error';

export const handleCastError22001 = () =>
  new AppError('La Longitud Fue Excedida.', 400);

export const handleCastError22P02 = () =>
  new AppError('El Tipo De Dato En La Base De Datos Es Invalido.', 400);

export const handleCastError2305 = () =>
  new AppError('El Valor Del Campo Ya Existe.', 400);

export const handleJWTError = () =>
  new AppError('Token Invalido O Manipulado.', 401);

export const handleJWTExpiredError = () =>
  new AppError('El Token Expiro, ¡Inicia Sesión Nuevamente!.', 401);

export const handleSequelizeDbError = () =>
  new AppError('Hubo Un Error Al Guardar En La Base De Datos.', 500);

export const handleTORMDuplicate = (detail: string) =>
  new AppError(`Valor Duplicado : ${detail}`, 400);

export const handleSequelizeValidatonError = (errors: [any]) => {
  const cleanErrors = errors.map((error) => {
    const message = `El Campo (${error.path}) Con El Valor (${error.value}), No Es Valido.`;
    return { message };
  });
  return new AppError(cleanErrors, 400);
};
