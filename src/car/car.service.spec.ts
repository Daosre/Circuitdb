import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CarService } from './car.service';
import { CreateCarDto } from './dto';
import { CarPrismaMock } from './mock/car.prisma.mock';

describe('CarService', () => {
  let carService: CarService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        { provide: PrismaService, useValue: CarPrismaMock },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  //Test quand ca fonctionne au niveau du create
  it('should add a new car if the name is not taken', async () => {
    const dto: CreateCarDto = {
      name: 'NewCar',
      description: 'plopi',
      image:
        'https://images.unsplash.com/photo-1721332150382-d4114ee27eff?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 1,
    };

    jest.spyOn(prisma.car, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prisma.car, 'create').mockResolvedValue({
      id: 'car_id',
      ...dto,
      createdAt: new Date(),
      updateAt: new Date(),
    });

    const result = await carService.addCar(dto);

    // Utilisez expect.objectContaining pour ignorer les dates
    expect(result).toEqual(
      expect.objectContaining({
        id: 'car_id',
        ...dto,
      }),
    );
  });

    //Test quand il y a l'erreur au niveau du create ( Name already taken)
  it('should throw a ForbiddenException if the car name is already taken', async () => {
    const dto: CreateCarDto = {
      name: 'ExistingCar',
      description: '',
      image: '',
      price: 0,
    };

    // Simule une voiture avec le même nom
    jest.spyOn(prisma.car, 'findFirst').mockResolvedValue({
      ...dto,
      createdAt: new Date(),
      updateAt: new Date(),
      id: 'P',
    });

    // On s'assure que create ne sera pas appelé
    const createSpy = jest.spyOn(prisma.car, 'create');

    // L'appel devrait échouer avec ForbiddenException
    await expect(carService.addCar(dto)).rejects.toThrow(
      new ForbiddenException('Name Already Taken'),
    );
  });
});
