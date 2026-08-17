import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

}