import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, PrismaService],
})
export class ReservationModule {}
