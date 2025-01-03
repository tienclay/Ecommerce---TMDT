import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, EcommerceApiResponse } from '@decorators';
import { UserOutputDto } from './dto/user-output.dto';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { LoginDto } from './dto/login-input.dto';
import { GenerateTokenInfoDto } from './dto/generate-token-info.dto';
import { AuthGuard, TokenGuard } from '@guards';
import { User } from '@entities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserOutputDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @EcommerceApiResponse(UserOutputDto)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'Current user found',
    type: UserOutputDto,
  })
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @EcommerceApiResponse(ResponseAuthDto)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('generate-token')
  @UseGuards(TokenGuard)
  @ApiOperation({ summary: 'Generate token' })
  @ApiHeader({
    name: 'x-refresh-token',
  })
  @EcommerceApiResponse(ResponseAuthDto)
  generateToken(@CurrentUser() user: GenerateTokenInfoDto) {
    return this.authService.generateToken(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
