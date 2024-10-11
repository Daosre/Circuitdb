import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/Guards';
import { userReservationDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  createUserReservation(
    @Body() dto: userReservationDto,
    @GetUser() user: User,
  ) {
    return this.userService.createReservation(dto, user);
  }

  @Delete('/delete/:id')
  deleteUserReservation(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.deleteReservation(user, id);
  }
}
