import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
dotenv.config();

// checks required env variables are set
async function loadEnvVars() {
  const result = await dotenv.config();

  if (result.error) {
    throw result.error;
  }

  if (process.env.DB_CONNECTION_STRING === undefined) {
    console.log('db_connection_string not set');
  }

  else {
    console.log('db_connection_string set');
  }
}


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.enableCors();
    await app.listen(3000);
  } catch (err) {
    console.error(err);
    console.log(process.env.DB_CONNECTION_STRING);
  }
}

loadEnvVars().then(() => {
  console.log('load envs');
  bootstrap();
});
