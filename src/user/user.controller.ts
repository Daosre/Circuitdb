import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/Guards';
import { userReservationDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/reservation/all')
  getAllUserReservation() {
    return this.userService.getAllUserReservation();
  }

  @Post('/create')
  createUserReservation(
    @Body() dto: userReservationDto,
    @GetUser() user: User,
  ) {
    return this.userService.createReservation(dto, user);
  }

  //@Delete('/deleteReservation/:id')
  //deleteUserReservation(@Param('id') id: string, @GetUser() user: User) {
  //  return this.userService.deleteReservation(user, id);
  //}
}
