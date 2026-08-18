import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dtos/user-signup-dto';
import { UserSignInDto } from './dtos/user-signin-dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    async signup(@Body() userSignUpDto: UserSignUpDto) {
        return await this.authService.signup(userSignUpDto);
    }

    @Post('/signin')
    async signin(@Body() userSignInDto: UserSignInDto) {
        return await this.authService.login(userSignInDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
