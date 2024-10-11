import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class createReservationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  tours: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  cardId: string;

  @IsString()
  @IsNotEmpty()
  reservationDate: string;
}
