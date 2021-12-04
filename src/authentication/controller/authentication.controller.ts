import { Body, Res, Req, Controller, HttpCode, Get, Post, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { RequestWithUser } from '../interface/requestwithuser.interface';
import { LocalAuthenticationGuard } from '../guard/local.authentication.guard';
import { JwtAuthenticationGuard } from '../guard/jwt-authentication.guard';
import { Response } from 'express';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const {user} = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }
}