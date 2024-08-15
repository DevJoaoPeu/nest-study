import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '',
    }),
    UserModule,
  ],
  controllers: [AuthController],
  exports: [],
  providers: [],
})
export class AuthModule {}
