import { Module, Global } from '@nestjs/common';
import { ConfigService } from '../services';

/**
 * Exposes the ConfigService for injection
 */

@Global()
@Module({
  providers: [
    ConfigService,
  ],
  exports: [ConfigService],
})
class ConfigModule { }

export { ConfigModule };
