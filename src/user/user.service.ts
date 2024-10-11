import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { error } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { userReservationDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createReservation(dto: userReservationDto, user: User) {
    const id = uuidv4();
    const res = await this.prisma
      .$executeRaw`INSERT INTO "User_Reservation" ("id","reservationId", "priceTotal", "userId") VALUES (${id}, ${dto.reservationId},${dto.priceTotal},${user.id})`;
    if (res === 1) {
      return { message: 'User Reservation Created' };
    }
    throw new error();
  }

  async deleteReservation(user: User, id: string) {
    const res = await this.prisma
      .$executeRaw`DELETE FROM  "User_Reservation" WHERE "id" = ${id} AND "userId" ${user.id}`;
    if (res === 1) {
      return { message: 'User Reservation Deleted' };
    }
    throw new ForbiddenException('Not Found Reservation');
  }
}
