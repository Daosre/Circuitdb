import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @IsOptional()
  @Min(2)
  @Max(4)
  price: number;
}
