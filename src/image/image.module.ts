import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, JwtGuard],
})
export class ImageModule {}
