import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.enableCors()

  const PORT = 7000
  await app.listen(PORT, () => console.log(`Server started on port - ${PORT}`));
}

start();
