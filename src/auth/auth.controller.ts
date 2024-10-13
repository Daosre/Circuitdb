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
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { requestResetDto, resetPasswordDto, SignInDto, SignUpDto } from './dto';
import { JwtGuard } from './Guards';
import { AdminGuard } from './Guards/admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/SignUp')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('/SignIn')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get('/user/all')
  getAllUser() {
    return this.authService.getAllUser();
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete('/delete/user/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Post('/missingPassword')
  requestPassword(@Body() dto: requestResetDto) {
    return this.authService.requestResetPassword(dto);
  }

  @UseGuards(JwtGuard)
  @Patch('/resetPassword')
  resetPassword(@Body() dto: resetPasswordDto, @GetUser() user: User) {
    return this.authService.resetPassword(dto, user);
  }
}
