import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { userReservationDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUserReservation(@Body() dto: userReservationDto, user: User) {
    return this.userService.createReservation(dto, user);
  }
}
