import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from '@config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: AuthConfig.jwtAccessSecret,
      signOptions: {
        expiresIn: parseInt(AuthConfig.accessTokenExpiration, 10),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
