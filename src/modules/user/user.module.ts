import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Profile, User } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Course])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
