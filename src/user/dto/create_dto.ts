import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class userReservationDto {
  @IsUUID()
  @IsNotEmpty()
  reservationId: string;

  @IsNumber()
  @IsNotEmpty()
  priceTotal: number;

  @IsString()
  @IsNotEmpty()
  reservationDate: string;
}
