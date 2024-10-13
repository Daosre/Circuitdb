import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { userReservationDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUserReservation() {
    return this.prisma.user_Reservation.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async createReservation(dto: userReservationDto, user: User) {
    const id = uuidv4();
    const res = await this.prisma
      .$executeRaw`INSERT INTO "User_Reservation" ("id","reservationId", "priceTotal", "userId") VALUES (${id}, ${dto.reservationId},${dto.priceTotal},${user.id})`;
    if (res === 1) {
      return { message: 'User Reservation Created' };
    }
    throw new ForbiddenException('Reservation Id wrong');
  }
}
