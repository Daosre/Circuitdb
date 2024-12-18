import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/Guards';
import { AdminGuard } from 'src/auth/Guards/admin.guard';
import { createReservationDto } from './dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @UseGuards(JwtGuard, AdminGuard)
  @Get('/all')
  getAllReservation() {
    return this.reservationService.getAllReservation();
  }

  @UseGuards(JwtGuard)
  @Post('/new')
  createReservation(@Body() dto: createReservationDto) {
    return this.reservationService.addReservation(dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete('/delete/:id')
  deleteUserReservation(@Param('id') id: string, @GetUser() user: User) {
    return this.reservationService.deleteReservation(user, id);
  }
}
