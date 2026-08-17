import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dtos/user-signup-dto';
import { UserSignInDto } from './dtos/user-signin-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('/signup')
    async signup(@Body() userSignUpDto: UserSignUpDto){
        return await this.authService.signup(userSignUpDto);
    }

    @Post('/signin')
    async signin(@Body() userSignInDto: UserSignInDto){
        return await this.authService.signin(userSignInDto);
    }
}
