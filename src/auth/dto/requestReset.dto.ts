import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class requestResetDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(320)
  email: string;
}
