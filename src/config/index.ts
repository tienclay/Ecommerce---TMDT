import DatabaseConfig from './db.config';
import LogConfig from './log.config';
import AuthConfig from './auth.config';
import PayConfig from './pay.config';
import PayUrlConfig from './pay-url.config';
const configurations = [DatabaseConfig, LogConfig, PayConfig];
export {
  configurations,
  DatabaseConfig,
  LogConfig,
  AuthConfig,
  PayConfig,
  PayUrlConfig,
};
