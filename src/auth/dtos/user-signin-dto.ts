import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class UserSignInDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}