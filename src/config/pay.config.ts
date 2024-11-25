import { HttpModuleOptions } from '@nestjs/axios';
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});

export default registerAs<HttpModuleOptions>('pay-service', () => ({
  baseURL: process.env.BASE_URL || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.X_API_KEY,
  },
}));
