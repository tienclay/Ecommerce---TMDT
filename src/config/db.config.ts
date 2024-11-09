import { join } from 'path';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NamingStrategy } from 'database/typeorm';

export default registerAs<TypeOrmModuleOptions>('database', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: process.env.DB_LOGGING === 'true',
  autoLoadEntities: true,
  keepConnectionAlive: true,
  entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
}));
