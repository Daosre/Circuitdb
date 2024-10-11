import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReservationDto } from './dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}
  async addReservation(dto: createReservationDto) {
    const existingCarId = await this.prisma.car.findUnique({
      where: {
        id: dto.cardId,
      },
    });
    if (!existingCarId) {
      throw new ForbiddenException('Car not exist');
    }
    const reservation = await this.prisma.reservation.create({
      data: {
        ...dto,
      },
    });
    return reservation;
  }
}
