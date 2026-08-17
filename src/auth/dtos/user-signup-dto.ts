import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class UserSignUpDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}