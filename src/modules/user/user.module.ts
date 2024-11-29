import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Course,
  CourseTutor,
  Order,
  Profile,
  Review,
  User,
  Like,
  Status,
} from '@entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      Course,
      CourseTutor,
      Order,
      Review,
      Like,
      Status,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
