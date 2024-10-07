import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async getAllCar() {
    return this.prisma.car.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async addCar(dto: CreateCarDto) {
    const existingCar = await this.prisma.car.findFirst({
      where: {
        name: dto.name,
      },
    });
    if (existingCar) {
      throw new ForbiddenException('Name Already Taken');
    }

    const car = await this.prisma.car.create({
      data: {
        ...dto,
      },
    });
    return car;
  }

  async updateCar(dto: UpdateCarDto, id: string) {
    const existingCar = await this.prisma.car.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingCar || !existingCar) {
      throw new ForbiddenException('Unexciting id');
    }
    await this.prisma.car.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return { message: 'Successful' };
  }

  async deleteCar(id: string) {
    const existingCar = await this.prisma.car.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingCar || !existingCar.id) {
      throw new ForbiddenException('Unexciting Id');
    }
    await this.prisma.car.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Deleted' };
  }
}
