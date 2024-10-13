import { IsNotEmpty, IsStrongPassword, MaxLength } from 'class-validator';

export class resetPasswordDto {
  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(255)
  password: string;
}
