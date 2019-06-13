import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule, ConfigModule } from './modules';
import { AppController } from './controllers';
import {
  AppService,
  SessionService,
  ConfigService,
} from './services';
import {
  SessionMiddleware,
} from './middleware';

/**
 * Base application module that injects Mongoose and configures
 * all necessary middleware.
 */

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        config: ConfigService
      ): Promise<MongooseModuleOptions> => (config.mongooseOptions),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SessionService,
  ],
})
class AppModule implements NestModule {
  private readonly config: ConfigService;

  public constructor(config: ConfigService) {
    this.config = config;
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SessionMiddleware).forRoutes('*');
    if (this.config.isDevelopment) {
      // eslint-disable-next-line
      const { devServer, hotServer } = require('./middleware/dev.middleware');
      consumer.apply(devServer, hotServer).forRoutes('/');
    }
  }
}

export { AppModule };
