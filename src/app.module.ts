import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActivateModule } from './activate/activate.module';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { EmailModule } from './email/email.module';
import { ImageModule } from './image/image.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    EmailModule,
    ActivateModule,
    CarModule,
    UserModule,
    ReservationModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
