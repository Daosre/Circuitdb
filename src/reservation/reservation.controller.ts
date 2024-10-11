import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { createReservationDto } from './dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/new')
  createReservation(@Body() dto: createReservationDto) {
    return this.reservationService.addReservation(dto);
  }
}
