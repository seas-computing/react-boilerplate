import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controllers';
import { AppService } from './services';
import {
  CASMiddleware,
  cas,
  devServer,
  hotServer,
  sessionInit,
} from './middleware';

const {
  NODE_ENV,
  DB_HOSTNAME,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

/**
 * Base application module that injects Mongoose and configures
 * all necessary middleware.
 */


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`,
      {
        useNewUrlParser: true,
        user: DB_USERNAME,
        pass: DB_PASSWORD,
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(sessionInit).forRoutes('*');
    if (NODE_ENV === 'development') {
      consumer.apply(devServer, hotServer).forRoutes('/');
    }
    consumer.apply(cas.bounce, CASMiddleware).forRoutes('*');
  }
}

export { AppModule };
