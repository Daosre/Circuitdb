import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @Min(2)
  @Max(1000)
  @IsNotEmpty()
  price: number;
}
