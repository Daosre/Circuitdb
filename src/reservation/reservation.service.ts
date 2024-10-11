import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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

  async deleteReservation(user: User, id: string) {
    const existingReservation = await this.prisma.reservation.findUnique({
      where: {
        id: id,
      },
      include: {
        reservation: true,
      },
    });
    if (!existingReservation) {
      throw new ForbiddenException('Not Find Reservation');
    }

    await this.prisma
      .$executeRaw`DELETE FROM  "User_Reservation" WHERE "reservationId" = ${existingReservation.id} `;
    await this.prisma.reservation.delete({
      where: {
        id: existingReservation.id,
      },
    });
    return { message: 'Deleted' };
  }
}
