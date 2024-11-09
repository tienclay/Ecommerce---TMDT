import { GenerateTokenInfoDto } from '../../modules/auth/dto/generate-token-info.dto';
import { AuthConfig } from '@config';
import { User } from '@entities';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: AuthConfig.jwtRefreshSecret,
      });
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      const email = payload.email;
      const user = await this.userRepository.findOneBy({
        email,
        refreshToken: token,
      });
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      const expiresIn = payload.exp * 1000 - Date.now();
      const userPayload = plainToInstance(GenerateTokenInfoDto, {
        id: user.id,
        email: user.email,
        expiresIn: Math.floor(expiresIn / 1000),
      });
      request['user'] = userPayload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers['x-refresh-token'] as string | undefined;
  }
}
