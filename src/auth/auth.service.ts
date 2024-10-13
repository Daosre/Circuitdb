import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { role } from 'src/utils/const';
import { SignInDto, SignUpDto } from './dto';
import { JwtGuard } from './Guards';
import { AdminGuard } from './Guards/admin.guard';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}

  async signToken(userId: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async signUp(dto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already taken');
    }
    const userRole = await this.prisma.role.findUnique({
      where: {
        name: role.USER,
      },
    });

    if (!userRole) {
      throw new NotFoundException('Not Found Role');
    }

    const hash = await argon.hash(dto.password);
    const activationToken = await argon.hash(`${new Date()} + ${dto.email}`);
    const newToken = activationToken.replaceAll('/', '');
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        roleId: userRole.id,
        token: newToken,
      },
    });
    await this.emailService.sendUserConfirmation(user, newToken);
    return { message: 'Register Successful' };
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        Role: true,
        password: true,
        isActive: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    if (user.isActive === false) {
      throw new ForbiddenException('Inactive Account');
    }
    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid credentials');
    }
    return this.signToken(user.id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  async getAllUser() {
    return this.prisma.user.findMany({
      orderBy: {
        email: 'asc',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        updateAt: true,
      },
    });
  }

  @UseGuards(JwtGuard, AdminGuard)
  async deleteUser(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        reservation: true,
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException('Unexciting Id');
    }
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Delete with success' };
  }
}
