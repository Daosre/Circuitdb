import { Injectable } from '@nestjs/common';
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
    const data = { ...dto, user };
    const res = await this.prisma
      .$executeRaw`INSERT INTO "RESERVATION" ("id","name") VALUES (${id}, ${data})`;
    if (res === 1) {
      return 'RESERVATION created';
    }
    throw new error();
  }
}
