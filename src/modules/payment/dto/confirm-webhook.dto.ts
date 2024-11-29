import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmWebhookDto {
  @ApiProperty({
    description: 'URL webhook để xác nhận',
    example: 'http://yourwebhook.url/endpoint',
  })
  @IsString()
  @IsNotEmpty()
  webhookUrl: string;
}
