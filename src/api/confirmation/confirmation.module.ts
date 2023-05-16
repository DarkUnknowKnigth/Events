import { Module } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationController } from './confirmation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confirmation } from './entities/confirmation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Confirmation])],
  controllers: [ConfirmationController],
  providers: [ConfirmationService],
})
export class ConfirmationModule {}
