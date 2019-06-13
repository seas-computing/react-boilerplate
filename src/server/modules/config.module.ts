import { Module, Global } from '@nestjs/common';
import { ConfigService } from '../services';

/**
 * Exposes the ConfigService for injection
 */

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(process.env),
    },
  ],
  exports: [ConfigService],
})
class ConfigModule { }

export { ConfigModule };
