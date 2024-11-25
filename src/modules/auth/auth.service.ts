import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities';
import {
  EcommerceConflictException,
  EcommerceNotFoundException,
  EcommerceUnauthorizedException,
} from '@exceptions';
import { comparePassword, hashPassword } from '@utils';
import { plainToInstance } from 'class-transformer';
import { UserOutputDto } from './dto/user-output.dto';
import { LoginDto } from './dto/login-input.dto';
import { AuthConfig } from '@config';
import { JwtService } from '@nestjs/jwt';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { GenerateTokenInfoDto } from './dto/generate-token-info.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto): Promise<UserOutputDto> {
    try {
      const isEmailExist = await this.isEmailExist(createAuthDto.email);
      if (isEmailExist) {
        throw new EcommerceConflictException('Email already exist');
      }
      const isUsernameExist = await this.isUsernameExist(
        createAuthDto.username,
      );
      if (isUsernameExist) {
        throw new EcommerceConflictException('Username already exist');
      }
      const hashedPassword = await hashPassword(createAuthDto.password);
      const hashedDto = {
        ...createAuthDto,
        password: hashedPassword,
        profile: {},
      };
      const user = this.userRepository.create(hashedDto as User);
      await this.userRepository.save(user);
      const userId = user.id;
      return plainToInstance(UserOutputDto, userId);
    } catch (error) {
      throw error;
    }
  }
  async isEmailExist(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? true : false;
  }
  async isUsernameExist(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user ? true : false;
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOne({
        where: { email: email },
        select: {
          id: true,
          email: true,
          password: true, // needed for password comparison
          status: true,
          role: true,
          refreshToken: true,
        },
      });
      if (!user) {
        throw new EcommerceNotFoundException('Email not found');
      }
      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) {
        throw new EcommerceUnauthorizedException('Invalid email or password');
      }
      return this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  async generateToken(user: GenerateTokenInfoDto): Promise<ResponseAuthDto> {
    const payload = { email: user.email, id: user.id };
    const expiredIn = user.expiredIn
      ? user.expiredIn
      : AuthConfig.refreshTokenExpiration;
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: AuthConfig.jwtRefreshSecret,
      expiresIn: expiredIn,
    });
    await this.userRepository.update(user.id, { refreshToken });
    return plainToInstance(ResponseAuthDto, { accessToken, refreshToken });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
