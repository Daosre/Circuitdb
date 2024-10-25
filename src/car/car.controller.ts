import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards';
import { AdminGuard } from 'src/auth/Guards/admin.guard';
import { CarService } from './car.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/all')
  getAllCar() {
    return this.carService.getAllCar();
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Post('/new')
  createCar(@Body() dto: CreateCarDto) {
    return this.carService.addCar(dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('/update/:id')
  updateCar(@Body() dto: UpdateCarDto, @Param('id') id: string) {
    return this.carService.updateCar(dto, id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete('/delete/:id')
  deleteCar(@Param('id') id: string) {
    return this.carService.deleteCar(id);
  }
}
