import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location, User } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Location, User])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
