import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class userReservationDto {
  @IsUUID()
  @IsNotEmpty()
  reservationId: string;

  @IsNumber()
  @IsNotEmpty()
  priceTotal: number;
}
