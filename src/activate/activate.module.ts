import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivateController } from './activate.controller';
import { ActivateService } from './activate.service';

@Module({
  controllers: [ActivateController],
  providers: [ActivateService, PrismaService],
})
export class ActivateModule {}
