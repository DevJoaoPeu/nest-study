import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'urjsi8du7f8hfjfon',
    }),
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
