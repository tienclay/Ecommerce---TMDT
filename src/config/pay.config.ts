import { HttpModuleOptions } from '@nestjs/axios';
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});

export default registerAs<HttpModuleOptions>('pay-service', () => ({
  baseURL: process.env.BASE_URL || 'http://localhost:3069',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}));
