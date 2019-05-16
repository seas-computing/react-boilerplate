import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { devServer, hotServer } from './middleware';

const { NODE_ENV } = process.env;

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (NODE_ENV === 'development') {
      consumer.apply(devServer, hotServer).forRoutes('/');
    }
  }

}
