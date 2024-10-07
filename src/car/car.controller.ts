import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/all')
  getAllCar() {
    return this.carService.getAllCar();
  }

  @Post('/new')
  createCar(@Body() dto: CreateCarDto) {
    return this.carService.addCar(dto);
  }

  @Patch('/update/:id')
  updateCar(@Body() dto: UpdateCarDto, @Param('id') id: string) {
    return this.carService.updateCar(dto, id);
  }

  @Delete('/delete/:id')
  deleteCar(@Param('id') id: string) {
    return this.carService.deleteCar(id);
  }
}
