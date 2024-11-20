const AuthConfig = {
  jwtAccessSecret: process.env.JWT_SECRET || 'iamtienclay1',
  jwtRefreshSecret: process.env.JWT_SECRET || 'iamtienclay2',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRES_IN || '3600000',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRES_IN || '3600000',
};

export default AuthConfig;
