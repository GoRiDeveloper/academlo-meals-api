import { AppDataSrc } from './services/databases/main.database.config';
import { app } from './app';
import { port } from './config/config';
import { AppError } from './utils/app.error';

(async () => {
  try {
    await AppDataSrc.initialize();
    console.info('Base De Datos Conectada.');
  } catch (e) {
    console.error(`BD Error : ${e}`);
    throw new AppError('La Base De Datos No Pudo Concectarse.', 500);
  }

  const server = app.listen(port, () =>
    console.log(`Servidor Conectado En El Puerto : ${port}`)
  );
  server.on('error', (e: any) => {
    console.log(e);
    throw new AppError('Ocurrio Un Error Al Conectar El Servidor.', 500);
  });
})();
