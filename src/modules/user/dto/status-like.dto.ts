import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty()
  userId?: string;

  @ApiProperty({
    description: 'Content of the status',
    example: 'Hello, world!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    required: false,
    description: 'ID of the parent status',
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  parentStatusId?: string;
}

export class StatusResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  parentStatusId?: string;

  @ApiProperty()
  @IsNotEmpty()
  likesCount: number;
}

export class LikeStatusDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  statusId: string;
}
