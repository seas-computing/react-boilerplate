import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SAMLStrategy } from '../services';

/**
 * Exposes the PassportModule with SAMLStrategy for injection
 */

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'saml' })],
  providers: [SAMLStrategy],
  exports: [PassportModule],
})
class AuthModule { }

export { AuthModule };
